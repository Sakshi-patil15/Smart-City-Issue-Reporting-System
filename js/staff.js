import { db } from "./firebase.js";
import {
    collection,
    getDocs,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const table = document.getElementById("issueTable");

async function loadIssues() {
    table.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "issues"));

    querySnapshot.forEach((docSnap) => {
        const issue = docSnap.data();

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${issue.name}</td>
            <td>${issue.category}</td>
            <td>${issue.location || "Not provided"}</td>
            <td>${issue.status}</td>
            <td>
                <button onclick="markResolved('${docSnap.id}')">
                    Mark Resolved
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}

window.markResolved = async function (id) {
    const ref = doc(db, "issues", id);
    await updateDoc(ref, {
        status: "Resolved"
    });

    alert("Status updated to Resolved");
    loadIssues();
};

loadIssues();
