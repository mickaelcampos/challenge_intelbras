import { Router } from 'express';

type Produto = {
	id: number,
	nome: string,
	potencia: number,
	tipo: 'modulo' | 'inversor'
}

type Projeto = {
	potencia: number,
	moduloID: number
}

type Inversor = {
	id: number,
	nome: string,
	potencia: number
}

type Modulo = {
	id: number,
	nome: string,
	potencia: number
};

/**
 * @param PP Potência do projeto
 * @param PM Potência do módulo
 * @returns Quantidade de módulos necessários para o projeto
 */
const M = (PP: number, PM: number) => Math.ceil(PP / PM);

/**
 * @param PI Potência do Inversor
 * @param PM Potência do Módulo
 * @returns Quantidade de módulos suportados pelo inversor
 */
const MI = (PI: number, PM: number) => (PI * 1000) / PM;

/**
 * @param M Quantidade de módulos necessários no projeto
 * @param MI Quantidade de módulos suportados pelo inversor
 * @returns Quantidade do mesmo inversor que será necessária para o projeto
 */
const QI = (M: number, MI: number) => M / MI;

const routes = Router();

routes.post('/calcular', (req, res) => {

	const solucao: {
		id: number,
		nome: string,
		potencia: number,
		quantidade: number
	}[] = [];

	const body: { produtos: Produto[], projeto: Projeto } = req.body;
	const { produtos, projeto } = body;

	/* Cada inversor suporta uma quantidade máxima de módulos, dependendo da potência do módulo;
	deve-se calcular essa quantidade máxima suportada para cada módulo e cada inversor na lista */
	const inversores = produtos.filter(i => i.tipo === 'inversor');
	const modulos = produtos.filter(m => m.tipo === 'modulo');
	const inversores_modulos: { inversor: Inversor, modulo: Modulo, qtdMaxSuportada: number }[] = [];
	for (const i of inversores) {
		for (const m of modulos) {
			inversores_modulos.push({
				inversor: { ...i },
				modulo: { ...m },
				qtdMaxSuportada: MI(i.potencia, m.potencia)
			});
		}
	}
	/* Após calcular as quantidades máximas de módulos que cada inversor consegue suportar, deve-se calcular
	quantos módulos são necessários para a potência desejada para o projeto */
	const modulo = modulos.find(m => m.id === projeto.moduloID) as Modulo;
	const qtdModulosNecessarios = M(projeto.potencia, modulo.potencia);

	const inversoresCandidatos: Inversor[] = [];
	for (const item of inversores_modulos) {
		if (item.modulo.id === projeto.moduloID && item.qtdMaxSuportada >= qtdModulosNecessarios) {
			inversoresCandidatos.push(item.inversor);
		}
	}

	const getInversorMenorPotencia = (inversores: Inversor[]): Inversor => {
		let i = 0;
		let invMenorPotencia = inversores[i++];
		while (i < inversores.length) {
			if (invMenorPotencia.potencia > inversores[i].potencia) {
				invMenorPotencia = inversores[i];
			}
			i++;
		}
		return invMenorPotencia;
	};
	
	if (inversoresCandidatos.length === 0) {
		/* Se nenhum inversor suportar a quantidade necessária de módulos para o projeto, então deve-se incluir
		mais de uma unidade do mesmo inversor na solução */
		const invMenorPotencia = getInversorMenorPotencia(inversores);
		const qtdMaxSuportada =  MI(invMenorPotencia.potencia, modulo.potencia);
		solucao.push({ 
			...invMenorPotencia, 
			quantidade: Math.ceil(QI(qtdModulosNecessarios, qtdMaxSuportada))
		});

	} else if (inversoresCandidatos.length === 1) {
		/* Se apenas um inversor suporta a quantidade necessária de módulos para o projeto, então esse deverá ser o
		indicado na solução; */
		const invMenorPotencia = inversoresCandidatos[0];
		solucao.push({ ...invMenorPotencia, quantidade: 1 });
	} else { 
		/* Se dois ou mais inversores suportam a quantidade necessária de módulos para o projeto, então o inversor com a
		menor potência deve ser o indicado na solução; */
		const invMenorPotencia = getInversorMenorPotencia(inversoresCandidatos);
		solucao.push({ ...invMenorPotencia, quantidade: 1 });
	}

	res.send({solucao});
});

export default routes;