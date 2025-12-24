import { db } from "/js/firebase.js";
import {
  collection,
  addDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

console.log("reportIssue.js loaded");

/* =========================
   SUBMIT ISSUE
========================= */
document.getElementById("submit").addEventListener("click", async () => {
  console.log("Submit clicked");

  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const location = document.getElementById("location").value;

  if (!name || !category || !description || !location) {
    alert("Fill all fields");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "issues"), {
      name,
      category,
      location,
      description,
      status: "Pending",
      createdAt: new Date()
    });

    alert(
      "✅ Issue submitted successfully!\n\n" +
      "Your Issue ID:\n" + docRef.id + "\n\n" +
      "Please save this ID to check status."
    );

    // Clear fields
    document.getElementById("name").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
    document.getElementById("location").value = "";

  } catch (error) {
    console.error("Firestore error:", error);
    alert(error.message);
  }
});

/* =========================
   CHECK ISSUE STATUS
========================= */
document.getElementById("checkStatus").addEventListener("click", async () => {

  const issueId = document.getElementById("issueId").value;
  const result = document.getElementById("statusResult");

  if (!issueId) {
    alert("Please enter Issue ID");
    return;
  }

  try {
    const docRef = doc(db, "issues", issueId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const status = docSnap.data().status;

      result.innerHTML =
        "📌 Current Status: <b style='color:" +
        (status === "Resolved" ? "green" :
         status === "In Progress" ? "orange" : "red") +
        "'>" + status + "</b>";

    } else {
      result.innerHTML = "❌ Issue not found";
    }

  } catch (error) {
    console.error("Status fetch error:", error);
    result.innerHTML = "❌ Error fetching status";
  }
});

