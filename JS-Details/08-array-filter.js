    const numeros = [5, 10, 14, 9, 11, 30];

    const numeroEncontrado = numeros.filter((num) => {
        return num == 10;
    });


    const nomes = [
        'Walyson',
        'Davi',
        'Edu',
        'Laura',
        'Livia',
        'Amy',
        'Paulo',
        'James',
        'Marcos',
        'Felipe',
        'Gabriel',
        'Gabrile',
        'Stephani',
        'Fontes',
        'Nathan',
    ];

    pessoasLetraN = nomes.filter((nome) => {
        const primeiraLetra = nome.substring(0, 1);
        return primeiraLetra == 'N' || primeiraLetra == 'L';
    });
    console.log(pessoasLetraN);
    // console.log(numeroEncontrado);