// Add your JavaScript functionalities here

// Helper function to get blogs from LocalStorage
function getBlogsFromLocalStorage() {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    return blogs;
}

// Helper function to set blogs in LocalStorage
function setBlogsInLocalStorage(blogs) {
    localStorage.setItem('blogs', JSON.stringify(blogs));
}

// Function to display blogs on the home page
function displayBlogs() {
    const blogListDiv = document.getElementById('blogList');
    const blogs = getBlogsFromLocalStorage();

    // Clear the blog list before adding new blogs
    blogListDiv.innerHTML = '';

    blogs.forEach(blog => {
        const blogItemDiv = document.createElement('div');
        blogItemDiv.classList.add('blog-item');

        const titleElem = document.createElement('h2');
        titleElem.textContent = blog.title;

        const summaryElem = document.createElement('p');
        summaryElem.textContent = blog.description;

        // Add a click event listener to navigate to the blog page on click
        blogItemDiv.addEventListener('click', () => {
            window.location.href = `blog.html?id=${blog.id}`;
        });

        blogItemDiv.appendChild(titleElem);
        blogItemDiv.appendChild(summaryElem);

        blogListDiv.appendChild(blogItemDiv);
    });
}

// Function to navigate back to the home page
function goToHomePage() {
    window.location.href = 'index.html';
}

// Function to display a single blog post on the blog page
function displayBlogPost() {
    const blogPostDiv = document.getElementById('blogPost');
    const blogs = getBlogsFromLocalStorage();
    const queryParams = new URLSearchParams(window.location.search);
    const blogId = queryParams.get('id');

    // Find the blog post with the matching id
    const blogPost = blogs.find(blog => blog.id === blogId);

    if (blogPost) {
        const titleElem = document.createElement('h2');
        titleElem.textContent = blogPost.title;

        const posterElem = document.createElement('p');
        posterElem.textContent = `Posted by: ${blogPost.poster}`;

        const contentElem = document.createElement('p');
        contentElem.textContent = blogPost.content;

        blogPostDiv.appendChild(titleElem);
        blogPostDiv.appendChild(posterElem);
        blogPostDiv.appendChild(contentElem);
    } else {
        blogPostDiv.innerHTML = '<p>Blog not found!</p>';
    }
}

// Event listener to display the blog post when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayBlogPost();
});



// Function to handle form submission for adding a new blog
function handleAddBlogFormSubmit(event) {
    event.preventDefault();

    const blogTitle = document.getElementById('blogTitle').value;
    const blogPoster = document.getElementById('blogPoster').value;
    const blogDescription = document.getElementById('blogDescription').value;
    const blogContent = document.getElementById('blogContent').value;

    if (!blogTitle || !blogPoster || !blogDescription || !blogContent) {
        alert('Please fill in all fields.');
        return;
    }

    const blogs = getBlogsFromLocalStorage();
    const newBlog = {
        id: Date.now().toString(),
        title: blogTitle,
        poster: blogPoster,
        description: blogDescription,
        content: blogContent
    };

    blogs.push(newBlog);
    setBlogsInLocalStorage(blogs);

    // Clear form fields
    document.getElementById('addBlogForm').reset();

    // Close the modal
    closeModal();

    // Display updated blogs on the home page
    displayBlogs();
}

// Function to open the add blog modal
function openModal() {
    document.getElementById('addBlogModal').style.display = 'block';
}

// Function to close the add blog modal
function closeModal() {
    document.getElementById('addBlogModal').style.display = 'none';
}

// Function to navigate back to the home page
function goToHomePage() {
    window.location.href = 'index.html';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    displayBlogs();
});

document.getElementById('addBlogButton').addEventListener('click', openModal);

document.querySelector('.close').addEventListener('click', closeModal);

document.getElementById('addBlogForm').addEventListener('submit', handleAddBlogFormSubmit);

// On the blog page, display the blog post details
if (window.location.pathname.includes('blog.html')) {
    displayBlogPost();
}

// Function to open the add blog modal
function openModal() {
    document.getElementById('addBlogModal').style.display = 'block';
}

// Function to close the add blog modal
function closeModal() {
    document.getElementById('addBlogModal').style.display = 'none';
}

// Event listener for the add blog button
document.getElementById('addBlogButton').addEventListener('click', openModal);

// Event listener for the close button in the modal
document.querySelector('.close').addEventListener('click', closeModal);


