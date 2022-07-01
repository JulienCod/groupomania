import { useEffect, useState } from "react";

function useIncrement(debut, pas){
    const [cpt, setCpt] = useState(debut);
    const increment= () =>{
        {setCpt(cpt => cpt + pas)}
    }
    return[cpt,increment]
}

function Test() {
    // const [personne,setPersonne] = useState({
    //     age:18,
    //     sexe:true,
    //     couleur:"noire"
    // })

    // const anniversaire = () => {
    //     const nouvellePersonne = {...personne};
    //     nouvellePersonne.age ++;
    //     setPersonne(nouvellePersonne);
    // }
    // const changementsexe = () => {
    //     const nouvellePersonne = {...personne};
    //     nouvellePersonne.sexe = !nouvellePersonne.sexe;
    //     setPersonne(nouvellePersonne);
    // }
    // const choixCouleur = (couleurDemandee) =>{
    //     const nouvellePersonne = {...personne};
    //     nouvellePersonne.couleur = couleurDemandee;
    //     setPersonne(nouvellePersonne);
    // }


    const [cpt, increment1] = useIncrement(0,1);
    const [cpt2, increment2] = useIncrement(10,3);

    return(
        <div>
            <button onClick={increment1}>{cpt}</button>
            <button onClick={increment2}>{cpt2}</button>
        </div>
    );
}

export default Test;