document.addEventListener('DOMContentLoaded', () => {
    // Initialize dropdowns
    const fromDropdown = initializeDropdown('from-container');
    const toDropdown = initializeDropdown('to-container');

    const convertButton = document.getElementById('convert-button');

    convertButton.addEventListener('click', async () => {
        convertButton.classList.add('loading');
        convertButton.disabled = true;

        try {
            await Converter();
        } catch (error) {
            console.error('Conversion error:', error);
        } finally {
            convertButton.classList.remove('loading');
            convertButton.disabled = false;
        }
    });

    // Handle swap button click
    const swapButton = document.getElementById('swap-currencies');
    swapButton.addEventListener('click', () => {
        const fromSelected = fromDropdown.getSelected();
        const toSelected = toDropdown.getSelected();
        const temp = fromSelected.innerHTML;
        fromSelected.innerHTML = toSelected.innerHTML;
        toSelected.innerHTML = temp;

        const activeTimeRange = document.querySelector('.time-range-btn.active').dataset.range;
        handleTimeRangeClick(activeTimeRange);
    });


}); 