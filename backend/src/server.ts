(async () => {
	const app = (await import('./app')).default;
	app.listen(3000, () => console.log(`Server running at http://localhost:${3000}`));
})();
