const axios = require("axios");

const email = "mgnightfury@gmail.com";
const password = "aaaAAA111@";
// const accountId = "7714d097-b814-40f8-ae64-76281ef27b95";

let token = "";
let contactId = ";";
let kycId = "";
let cidId = "";

async function verifyUsr() {
  let userList = await axios.get(
    "http://localhost:4000/v1/auth/unverifiedUser"
  );
  if (userList.data.length > 0) {
    console.log("verifiable users", userList.data);
    userList.data.map(async (accountId) => {
      await axios({
        method: "POST",
        params: {
          email,
          password,
        },
        url: "https://sandbox.primetrust.com/auth/jwts",
        // url: "https://sandbox.primetrust.com/v2/users",
      })
        .then(async (response1) => {
          token = response1.data.token;
          await axios({
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            url: `https://sandbox.primetrust.com/v2/accounts/${accountId.accountId}`,
          })
            .then(async (response2) => {
              await axios({
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                url: `https://sandbox.primetrust.com${response2.data.data.relationships.contacts.links.related}`,
              })
                .then((res) => {
                  contactId = res.data.data[0].id;
                  console.log("contactId", contactId);
                })
                .catch((err) => {
                  console.log("error10", err?.response?.data?.errors[0]?.detail);
                });
              if (response2.data.data.attributes.status === "opened") {
                console.log("account is opened");
                return;
              }
              if (response2.data.data.attributes.status === "closed") {
                console.log("account is closed");
                return;
              }
              if (
                response2.data.data.attributes["uploaded-document-ids"].length <
                2
              ) {
                console.log(
                  "You uploaded only ",
                  response2.data.data.attributes["uploaded-document-ids"]
                    .length,
                  "documents"
                );
                console.log("plz upload documents");
                return;
              }
              const front =
                response2.data.data.attributes["uploaded-document-ids"][0];
              const back =
                response2.data.data.attributes["uploaded-document-ids"][1];
              console.log("first doc Id", front);
              console.log("back doc Id", back);
              await axios({
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  data: {
                    type: "kyc-document-checks",
                    attributes: {
                      "contact-id": contactId,
                      "uploaded-document-id": front,
                      "backside-document-id": back,
                      "kyc-document-type": "drivers_license",
                      identity: true,
                      "identity-photo": true,
                      "proof-of-address": true,
                      "kyc-document-country": "US",
                    },
                  },
                },
                url: "https://sandbox.primetrust.com/v2/kyc-document-checks",
                // url: "https://sandbox.primetrust.com/v2/users",
              })
                .then(async (res1) => {
                  kycId = res1.data.data.id;
                  console.log("kycId", kycId);
                  await axios({
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    data: {
                      data: {
                        type: "kyc-document-checks",
                        attributes: {
                          "contact-id": contactId,
                          "uploaded-document-id": front,
                          "backside-document-id": back,
                          "kyc-document-type": "drivers_license",
                          identity: true,
                          "identity-photo": true,
                          "proof-of-address": true,
                          "kyc-document-country": "US",
                        },
                      },
                    },
                    url: `https://sandbox.primetrust.com/v2/kyc-document-checks/${kycId}/sandbox/verify`,
                  }).then(async (res2) => {
                    console.log("kyc verified");
                    await axios({
                      method: "GET",
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                      url: `https://sandbox.primetrust.com/v2/cip-checks?contact.id=${contactId}&filter[status]=pending&sort=-created-at`,
                    }).then(async (res4) => {
                      cidId = res4.data.data[0].id;
                      console.log("cidId", cidId);
                      await axios({
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                        url: `https://sandbox.primetrust.com/v2/cip-checks/${cidId}/sandbox/approve`,
                      });
                    });
                  });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => {
              console.log("error2");
            });
        })
        .catch((err) => {
          console.log("error1", err?.response?.data?.errors[0]?.detail);
        });
    });
  } else {
    console.log("All are verified");
  }
}

const main = async () => {
  const func = async () => {
    try {
      await verifyUsr();
      setTimeout(async () => {
        await func();
      }, 1000 * 6);
    } catch (error) {}
  };
  await func();
};

main();
