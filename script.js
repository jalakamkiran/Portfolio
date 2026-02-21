// Counter animation
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target;
      const target = +el.dataset.target;
      let count = 0;
      const increment = target / 100;

      const update = () => {
        count += increment;
        if(count < target){
          el.innerText = Math.ceil(count).toLocaleString();
          requestAnimationFrame(update);
        } else {
          el.innerText = target.toLocaleString() + "+";
        }
      };
      update();
      counterObserver.unobserve(el);
    }
  });
},{threshold:0.6});

counters.forEach(c => counterObserver.observe(c));


// Expertise toggle
const tiles = document.querySelectorAll('.tile');
const panels = document.querySelectorAll('.panel');

tiles.forEach(tile => {
  tile.addEventListener('click', () => {

    const targetId = tile.dataset.panel;
    const panel = document.getElementById(targetId);

    const isOpen = panel.classList.contains('open');

    panels.forEach(p => p.classList.remove('open'));
    tiles.forEach(t => t.classList.remove('active'));

    if(!isOpen){
      panel.classList.add('open');
      tile.classList.add('active');
    }
  });
});