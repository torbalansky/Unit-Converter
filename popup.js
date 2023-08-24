document.addEventListener('DOMContentLoaded', function() {
    const cholesterolInput = document.getElementById('cholesterol-value');
    const triglyceridesInput = document.getElementById('triglycerides-value');
    const conversionType = document.getElementById('conversion-type');
    const convertedValue = document.getElementById('converted-value');
    const clearButton = document.getElementById('clear-btn');

    cholesterolInput.addEventListener('input', convertValue);
    triglyceridesInput.addEventListener('input', convertValue);
    cholesterolInput.addEventListener('focus', enableInput.bind(null, triglyceridesInput));
    triglyceridesInput.addEventListener('focus', enableInput.bind(null, cholesterolInput));
    conversionType.addEventListener('change', function() {
        highlightConversion();
        convertValue();
    });
    clearButton.addEventListener('click', clearInputs);

    function enableInput(input) {
        input.disabled = false;
    }

    function convertValue() {
        const cholesterolValue = parseFloat(cholesterolInput.value);
        const triglyceridesValue = parseFloat(triglyceridesInput.value);
        const selectedConversion = conversionType.value;

        let result = 0;

        if (!isNaN(cholesterolValue)) {
            if (selectedConversion === 'mgToMmol') {
                result += cholesterolValue / 38.67;
                triglyceridesInput.disabled = true;
            } else if (selectedConversion === 'mmolToMg') {
                result += cholesterolValue * 38.67;
            }
        }

        if (!isNaN(triglyceridesValue)) {
            if (selectedConversion === 'mgToMmol') {
                result += triglyceridesValue * 0.0113;
                cholesterolInput.disabled = true;
            } else if (selectedConversion === 'mmolToMg') {
                result += triglyceridesValue / 0.0113;
            }
        }

        if (isNaN(result)) {
            convertedValue.textContent = 'Invalid input';
        } else {
            convertedValue.textContent = formatNumber(result);
        }
    }

    function highlightConversion() {
        const options = conversionType.querySelectorAll('option');
        options.forEach(option => option.classList.remove('selected'));

        const selectedOption = conversionType.options[conversionType.selectedIndex];
        selectedOption.classList.add('selected');
    }

    function formatNumber(number) {
        const lastDecimal = Number(number.toFixed(4));
        const formattedNumber = lastDecimal.toString().replace(/\.?0+$/, '');
        if (formattedNumber.endsWith('.')) {
            return formattedNumber.slice(0, -1);
        }

        return formattedNumber;
    }

    function clearInputs() {
        cholesterolInput.value = '';
        triglyceridesInput.value = '';
        const inputFields = document.querySelectorAll('.input-container input');
        inputFields.forEach(inputFields => {
            inputFields.disabled = false;
        });
        convertedValue.textContent = '0';
    }
});
