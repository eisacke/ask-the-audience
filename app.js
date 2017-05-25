$(() => {

  const $bars = $('.bars');
  const $form = $('form');
  $form.on('submit', populateGraph);

  populateGraph();

  function generatePercentages(bars=4) {
    const randomNumbers = [];
    while(bars--) randomNumbers.push(Math.random());
    const total = randomNumbers.reduce((a, b) => a + b);

    return randomNumbers.map((number) => {
      return Math.round((number / total) * 100);
    });
  }

  function populateGraph(e) {
    e && e.preventDefault();
    const numOfBars = $form.find('input').val();
    let percentages = generatePercentages(numOfBars);

    while(percentages.reduce((a, b) => a + b) !== 100) percentages = generatePercentages(numOfBars);

    const largest = Math.max.apply(Math, percentages);
    const ratio = 100 / largest;
    const proportionalValues = percentages.map((percentage) => percentage * ratio);
    const width = 100 / numOfBars;

    $bars.empty();
    proportionalValues.forEach((percentage, index) => {
      $bars.append(`<div class="bar" style="left:${width*index}%;width:calc(${width}% - 4px)"><span>${percentages[index]}%</span></div>`);
      setTimeout(() => $('.bar').eq(index).css('height', `${percentage}%`), 100 * (index + 1));
    });
  }

});
