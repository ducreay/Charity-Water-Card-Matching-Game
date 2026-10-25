const cardColors = [
    {
        name: 'red',
        image: 'img/Charity Water logo (Red).jpg'
    },
    {
        name: 'orange',
        image: 'img/Charity Water logo (Orange).jpg'
    },
    {
        name: 'yellow',
        image: 'img/Charity Water logo (Yellow).jpeg'
    },
    {
        name: 'green',
        image: 'img/Charity Water logo (Green).jpg'
    },
    {
        name: 'blue',
        image: 'img/Charity Water logo (Blue).jpg'
    }
];

const cards = document.querySelectorAll('.card');
const resetButton = document.querySelector('#reset-button');
const congratulationsMessage = document.querySelector('#congratulations-message');
const blackCardImage = 'img/Charity Water logo (Black).jpg';
let selectedCards = [];
let isCheckingMatch = false;
let matchTimeout;

function showCard(card, color) {
    const image = card.querySelector('img');
    image.src = color.image;
    image.alt = `${color.name} Charity: water logo`;
    card.setAttribute('aria-label', `${color.name} Charity: water logo`);
}

function hideCard(card) {
    const image = card.querySelector('img');
    image.src = blackCardImage;
    image.alt = 'Black Charity: water logo card back';
    card.setAttribute('aria-label', 'Reveal card');
}

cards.forEach((card, index) => {
    const color = cardColors[index % cardColors.length];

    card.addEventListener('click', () => {
        if (isCheckingMatch || card.disabled || selectedCards.includes(card)) {
            return;
        }

        selectedCards.push({ card, color });
        showCard(card, color);

        if (selectedCards.length < 2) {
            return;
        }

        isCheckingMatch = true;

        matchTimeout = setTimeout(() => {
            const isMatch = selectedCards[0].color.name === selectedCards[1].color.name;

            selectedCards.forEach(({ card: selectedCard }) => {
                if (isMatch) {
                    selectedCard.classList.add('matched');
                    selectedCard.disabled = true;
                } else {
                    hideCard(selectedCard);
                }
            });

            if (isMatch && Array.from(cards).every((card) => card.classList.contains('matched'))) {
                congratulationsMessage.hidden = false;
            }

            selectedCards = [];
            isCheckingMatch = false;
            matchTimeout = undefined;
        }, 1000);
    });
});

resetButton.addEventListener('click', () => {
    clearTimeout(matchTimeout);
    selectedCards = [];
    isCheckingMatch = false;
    matchTimeout = undefined;
    congratulationsMessage.hidden = true;

    cards.forEach((card) => {
        card.classList.remove('matched');
        card.disabled = false;
        hideCard(card);
    });
});
