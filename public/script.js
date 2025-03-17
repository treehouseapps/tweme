const button = document.getElementById('like-button').addEventListener('click', () => {
    const postId = this.getAttribute("data-id")

    fetch(`/like/${postId}`, { method: "GET" })
        .then(response => response.json()) // Convert response to JSON
        .then(data => {
            if (data.success) {
                document.getElementById("like-count").innerText = data.likes.length + " Likes"; // Update UI
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error("Error:", error));

})