export type Produto = {
	id: number,
	nome: string,
	potencia: number,
	tipo: 'modulo' | 'inversor'
}

export type Projeto = {
	potencia: number,
	moduloID: number
}

export type Inversor = {
	id: number,
	nome: string,
	potencia: number
}

export type Modulo = {
	id: number,
	nome: string,
	potencia: number
};

export type Options = {
    produtos: {
        id: number;
        nome: string;
        potencia: number;
        tipo: string;
    }[],
    projeto: Projeto
}

export type Solucao = {
	id: number
	nome: string
	potencia: number
	quantidade: number
	tipo: string
}
