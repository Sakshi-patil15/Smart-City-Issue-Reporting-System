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

  const snapshot = await getDocs(collection(db, "issues"));

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.category}</td>
      <td>${data.location || "-"}</td>
      <td>${data.description}</td>
      <td>
        <select id="status-${docSnap.id}">
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </td>
      <td>
        <button onclick="updateStatus('${docSnap.id}')">
          Update
        </button>
      </td>
    `;

    table.appendChild(row);

    document.getElementById(`status-${docSnap.id}`).value = data.status;
  });
}

window.updateStatus = async function (id) {
  const status = document.getElementById(`status-${id}`).value;

  await updateDoc(doc(db, "issues", id), {
    status: status
  });

  alert("Status updated successfully");
};

loadIssues();
