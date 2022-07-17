function HomePage(){
    return <>
        <div>
            <div className="text-center text-2xl font-bold">React Test API jsonplaceholder</div>
            &nbsp;<br/>
            <p className="p-10">
                <b>Qu'est ce que jsonplaceholder ?</b><br/>
                &nbsp;<br/>
                JSONPlaceholder est une API REST en ligne gratuite que vous pouvez utiliser chaque fois que vous avez besoin de fausses données.
                Cela peut être dans un README sur GitHub, pour une démo sur CodeSandbox, dans des exemples de code sur Stack Overflow, ... ou simplement pour tester des choses localement.
            </p>
            <p className="px-10 py-4">
            <b>Attention </b><br/>
            &nbsp;<br/>
            <u>JSONPlaceholder ne gère pas la persistence des données</u>, mais gère les réponses des requêtes REST, pour voir si les requêtes sont valides appuyer sur [F12] pour
            voir l'exécution de la requête. 
            </p>
        </div>
    </>
}

export default HomePage