async function run() {
  const models = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_API_KEY_HERE`)
  const data = await models.json();
  const names = data.models.map(m => m.name);
  console.log(names.filter(n => n.includes('gemini')));
}
run();
