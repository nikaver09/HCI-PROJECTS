const ctx = document.getElementById('activityChart').getContext('2d');
const activityChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Distance (km)',
      data: [10, 0, 25, 30, 28, 0, 5, 12, 18, 16, 8, 25],
      backgroundColor: '#00d9a6',
      borderRadius: 4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#ccc' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      x: {
        ticks: { color: '#ccc' },
        grid: { color: 'rgba(255,255,255,0.05)' }
      }
    }
  }
});
