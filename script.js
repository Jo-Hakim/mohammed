function showContent(id) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
    
    // Show the selected page
    document.getElementById(id).style.display = 'block';
    
    // Remove active class from all links
    document.querySelectorAll('header ul li a').forEach(link => link.classList.remove('active'));
    
    // Add active class to the clicked link
    document.querySelector(`header ul li a[onclick="showContent('${id}')"]`).classList.add('active');
}

// Optionally, show the default page on load
document.addEventListener('DOMContentLoaded', () => showContent('home'));

