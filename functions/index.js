const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendTransactionNotification = functions.firestore.document("transactions/{transactionId}")
  .onWrite(async (change, context) => {
    const transaction = change.after.exists ? change.after.data() : null;
    const previousTransaction = change.before.exists ? change.before.data() : null;

    if (!transaction) {
      return null;
    }

    const userId = transaction.userId;
    const userRef = admin.firestore().collection("users").doc(userId);
    const userDoc = await userRef.get();
    const userEmail = userDoc.data().email;

    const message = {
      notification: {
        title: "Transaction Status",
        body: `Your transaction with ID ${context.params.transactionId} was ${transaction.status}.`
      },
      token: userDoc.data().pushToken
    };

    await admin.messaging().send(message);

    return admin.firestore().collection("mail").add({
      to: userEmail,
      message: {
        subject: "Transaction Status",
        text: `Your transaction with ID ${context.params.transactionId} was ${transaction.status}.`
      }
    });
  });