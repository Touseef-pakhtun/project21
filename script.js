// Activity icons mapping
const activityIcons = {
  'Work': './images/icon-work.svg',
  'Play': './images/icon-play.svg',
  'Study': './images/icon-study.svg',
  'Exercise': './images/icon-exercise.svg',
  'Social': './images/icon-social.svg',
  'Self Care': './images/icon-self-care.svg'
};

// Activity class mapping
const activityClasses = {
  'Work': 'work',
  'Play': 'play',
  'Study': 'study',
  'Exercise': 'exercise',
  'Social': 'social',
  'Self Care': 'self-care'
};

// Timeframe labels for previous period
const timeframeLabels = {
  'daily': 'Yesterday',
  'weekly': 'Last Week',
  'monthly': 'Last Month'
};

let activities = [];
let currentTimeframe = 'daily';

// Fetch data from JSON
async function loadData() {
  try {
    const response = await fetch('./data.json');
    activities = await response.json();
    renderCards();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Render activity cards
function renderCards() {
  const activityGrid = document.getElementById('activityGrid');
  activityGrid.innerHTML = '';

  activities.forEach(activity => {
    const card = createActivityCard(activity);
    activityGrid.appendChild(card);
  });
}

// Create individual activity card
function createActivityCard(activity) {
  const card = document.createElement('article');
  card.className = `activity-card ${activityClasses[activity.title]}`;
  
  const timeframes = activity.timeframes[currentTimeframe];
  const previousLabel = timeframeLabels[currentTimeframe];
  
  card.innerHTML = `
    <img src="${activityIcons[activity.title]}" alt="${activity.title} icon" class="activity-top-icon">
    <div class="activity-header">
      <h2 class="activity-title">${activity.title}</h2>
      <button class="activity-icon" aria-label="More options for ${activity.title}">
        <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
      </button>
    </div>
    <div class="activity-content">
      <p class="activity-current">${timeframes.current}hrs</p>
      <p class="activity-previous">${previousLabel} - ${timeframes.previous}hrs</p>
    </div>
  `;
  
  return card;
}

// Handle timeframe button clicks
function setupTimeframeButtons() {
  const buttons = document.querySelectorAll('.timeframe-btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      buttons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Update current timeframe and re-render
      currentTimeframe = button.dataset.timeframe;
      renderCards();
    });
  });
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupTimeframeButtons();
});
