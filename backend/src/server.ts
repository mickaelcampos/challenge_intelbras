(async () => {
	const app = (await import('./app')).default;
 
	app.get('/', function (_req, res) {
		res.send('Hello World');
	});

	app.listen(3000, () => console.log(`Server running at http://localhost:${3000}`));
})();
