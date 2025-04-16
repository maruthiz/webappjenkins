document.addEventListener('DOMContentLoaded', function() {
    const countElement = document.getElementById('count');
    const incrementBtn = document.getElementById('incrementBtn');
    
    let count = 0;
    
    incrementBtn.addEventListener('click', function() {
        count++;
        countElement.textContent = count;
    });
});
