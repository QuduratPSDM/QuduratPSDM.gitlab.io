function countdown(elementIds) {
    const [countdownElement, preCountdownElement, formElement] = elementIds.map(id => document.getElementById(id));

    const startTime = getTime(startHour, startMinute);
    const endTime = getTime(endHour, endMinute);

    function formatTime(number) {
        return number < 10 ? '0' + number : number;
    }

    function getTime(hour, minute) {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
    }

    let state = {
        preCountdown: '',
        countdown: '',
        formDisplay: 'none'
    };

    function updateCountdown() {
        const now = new Date();
        const preDiff = startTime - now;
        const diff = endTime - now;

        const getMinutes = diff => Math.floor((diff / 1000 / 60) % 60);
        const getSeconds = diff => Math.floor((diff / 1000) % 60);

        const newPreCountdown = (now >= startTime) ? '' : `${formatTime(getMinutes(preDiff))}:${formatTime(getSeconds(preDiff))}`;
        const newCountdown = (now < startTime || now >= endTime) ? '' : `${formatTime(getMinutes(diff))}:${formatTime(getSeconds(diff))}`;
        const newFormDisplay = (now < startTime || now >= endTime) ? 'none' : 'block';

        if (diff <= 30000 && diff > 0) {
            countdownElement.style.cssText = 'font-size: 2em; color: #FB3640;';
        }

        function updateElementAndState(element, stateKey, newValue) {
            if (newValue !== state[stateKey]) {
                element.textContent = newValue;
                state[stateKey] = newValue;
            }
        }

        updateElementAndState(preCountdownElement, 'preCountdown', newPreCountdown);
        updateElementAndState(countdownElement, 'countdown', newCountdown);

        if (newFormDisplay !== state.formDisplay) {
            formElement.style.display = newFormDisplay;
            state.formDisplay = newFormDisplay;
        }

        const announcementElement = document.getElementById('announcement');
        const h1Element = document.querySelector('h1');
        const h2Element = document.querySelector('h2');
        const logoElement = document.getElementById('logo');
        const footerElement = document.getElementsByTagName('footer');
        if (now >= startTime) {
            announcementElement.textContent = 'الوقت المتبقي';
            h1Element.style.fontSize = '1.5em';
            h2Element.style.fontSize = '0.8em';
            logoElement.style.height = '2em';
            footerElement[0].style.position = 'relative';
        }

        if (now >= endTime) {
            countdownElement.style.display = "none";
            document.getElementById("endOfTime").style.display = "flex";
            document.getElementById("countdownWrapper").style.display = "none";
            document.getElementsByTagName("header")[0].style.display = "none";
            document.getElementsByTagName("footer")[0].style.display = "none";
            setTimeout(() => window.location.href = redirectTarget, 2000);
        }        

        requestAnimationFrame(updateCountdown);
    }

    updateCountdown();
}

countdown(['countdown', 'preCountdown', 'form']);

// Development 16 1 2024