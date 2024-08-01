$(document).ready(function() {
    $('#calculateButton').click(function() {
        const weight = parseFloat($('#weight').val());
        const height = parseFloat($('#height').val()) / 100;
        const age = parseInt($('#age').val());
        const gender = $('#gender').val();
        
        if (weight > 0 && height > 0) {
            const bmi = weight / (height * height);
            localStorage.setItem('bmi', bmi.toFixed(2)); 
            localStorage.setItem('age', age);
            localStorage.setItem('gender', gender);
            window.location.href = 'rel.html'; 
        } else {
            alert('Please enter valid weight and height.');
        }
    });
    if (window.location.pathname.endsWith('rel.html')) {
        const bmiResult = localStorage.getItem('bmi');
        const age = localStorage.getItem('age');
        const gender = localStorage.getItem('gender');

        if (bmiResult) {
            $('#bmi-result').text(bmiResult);
            displaySuggestions(parseFloat(bmiResult)); 
        } else {
            $('#bmi-result').text('BMI data not found.');
        }
        const apiUrl = 'https://api.api-ninjas.com/v1/quotes?category=fitness';
        const apiKey = 'hjo1W6a8f0h3yhB5I/2Akg==M8Fmw29tnAJj021L';

        $.ajax({
            method: 'GET',
            url: apiUrl,
            headers: { 'X-Api-Key': apiKey },
            contentType: 'application/json',
            success: function(result) {
                console.log(result);
                if (Array.isArray(result) && result.length > 0) {
                    const quote = result[0].quote;
                    $('#quote-result').text(`"${quote}"`);
                } else {
                    $('#quote-result').text('No quotes found.');
                }
            },
            error: function(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
                $('#quote-result').text('Failed to load quote.');
            }
        });
    }
});

function displaySuggestions(bmi) {
    let suggestions = '';

    if (bmi < 18.5) {
        suggestions = 'You are underweight. Consider a balanced diet with more calories and consult a healthcare provider. Focus on strength training exercises to build muscle mass.';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        suggestions = 'You have a normal weight. Maintain your healthy lifestyle with a balanced diet and regular exercise. Incorporate a mix of cardio and strength training exercises to stay fit.';
    } else if (bmi >= 25 && bmi < 29.9) {
        suggestions = 'You are overweight. Consider a healthy eating plan, increased physical activity, and consult a healthcare provider. Focus on cardio exercises to burn calories and include strength training to build muscle.';
    } else if (bmi >= 30) {
        suggestions = 'You are obese. It is advisable to seek guidance from a healthcare provider to develop a weight loss plan that is right for you. Start with low-impact exercises and gradually increase intensity. Focus on a balanced diet and regular physical activity.';
    }

    $('#suggestions-result').text(suggestions);
}

function goBack() {
    window.location.href = 'bmical.html';
}
