// Simple test function to check if script.js is working properly
function testIncrement() {
    // Mock DOM elements
    global.document = {
        getElementById: function(id) {
            if (id === 'count') {
                return { textContent: 0 };
            } else if (id === 'incrementBtn') {
                return { 
                    addEventListener: function(event, callback) {
                        // Simulate click event
                        if (event === 'click') {
                            callback();
                        }
                    }
                };
            }
        },
        addEventListener: function(event, callback) {
            if (event === 'DOMContentLoaded') {
                callback();
            }
        }
    };
    
    // Load script (simulate)
    const countElement = { textContent: 0 };
    global.document.getElementById = function(id) {
        if (id === 'count') return countElement;
        if (id === 'incrementBtn') return { 
            addEventListener: function(event, callback) {
                // Trigger the click event
                callback();
            }
        };
    };
    
    // Simulate script execution
    require('../js/script.js');
    
    // Check if count was incremented
    console.log("Test result:", countElement.textContent === 1 ? "PASS" : "FAIL");
    return countElement.textContent === 1;
}

// Run the test
if (testIncrement()) {
    console.log("All tests passed!");
    process.exit(0); // Success exit code
} else {
    console.error("Tests failed!");
    process.exit(1); // Failure exit code
}