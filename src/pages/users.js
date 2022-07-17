import React from 'react';
import { useState } from 'react';

import axios from 'axios';
import './users.css';

function UserPage({users, updateUser}) {
    // Mode en cours
    const [mode,setMode] = useState('listing')
    const [erreur,setErreur] = useState(false)
    const [page,setPage] = useState(0)
    const pageSize = 5

    const url = 'https://jsonplaceholder.typicode.com/users/'
    /* Variable pour création, mise à jour et suppression */
    const [ currentUser, setCurrentUser ] = useState({
        id:null,
        name:'',
        email:'',
        website:'',
        address:{
            suite:'',
            street:'',
            zipcode:'',
            city:''
        }
    })
    const handleChange = (e)=>{
        switch (e.target.name) {
            case 'email': return setCurrentUser({...currentUser,email:e.target.value});
            case 'website': return setCurrentUser({...currentUser,website:e.target.value});
            case 'name': return setCurrentUser({...currentUser,name:e.target.value});
            case 'address_suite': return setCurrentUser({
                ...currentUser,
                address:{
                    ...currentUser.address,
                    suite:e.target.value
                }
            });
            case 'address_street': return setCurrentUser({
                ...currentUser,
                address:{
                    ...currentUser.address,
                    street:e.target.value
                }
            });
            case 'address_zipcode': return setCurrentUser({
                ...currentUser,
                address:{
                    ...currentUser.address,
                    zipcode:e.target.value
                }
            });     
            case 'address_city': return setCurrentUser({
                ...currentUser,
                address:{
                    ...currentUser.address,
                    zipcode:e.target.value
                }
            });                   
            default: return;
        }
    }
    const createUser = () => {
        setCurrentUser({ name:'', email:'', website:'', address:{ suite:'', street:'', zipcode:'', city:'' } })
        setMode('create')
    }
    const saveCreateUser = (e) => {
        console.log(currentUser);
        axios.post(url,{ ...currentUser }).then(d => {
            updateUser([...users,d.data])
            setMode('listing')
        })
    }
    const EditUser = (e) => {
        setCurrentUser(users.find(u => u.id==e.target.getAttribute('data-id')))
        setMode('edit')
    }
    const saveEditUser = (e) => {
        axios.put(url+currentUser.id,{ ...currentUser }).then(d => {
            let data = d.data
            let _u = users.map(u=> (u.id==currentUser.id)?currentUser:u )
            updateUser(_u)
            setMode('listing')
        }).catch( e => {
            setErreur('L\'utilisateur n\'a pas pu être mise à jour')
            setMode('error')
        })
    }
    const showDetailUser= (e) => {
        setCurrentUser(users.find(u => u.id==e.target.getAttribute('data-id')))
        setMode('detail')
    }
    const DeleteUser = (e) => {
        setCurrentUser(users.find(u => u.id==e.target.getAttribute('data-id')))
        setMode('delete')
    }
    const ComfirmeDeleteUser = (e) => {
        axios.delete(url+currentUser.id).then(d => {
            let _u = users.filter(u => u.id!==currentUser.id)
            updateUser(_u)
            setMode('listing')
        })
    }
    const changePage = (e) => { setPage(e.target.getAttribute('data-page')*1) }
    const cancelUser = (e) => { setMode('listing') }
    
    /* Rendu */
    return <>
        {
        ['edit','create','error','delete','detail'].includes(mode)&&<div className="overlay">
            <div className="userOverlay">
                <div className="userOverlayWin">
                {
                    (mode==='edit')&&<>
                    <div className="text-center font-bold">Modifier un utilisateur</div>
                    <div className="grid grid-cols-2 gap-4 p-4">
                        <label htmlFor="name">Nom</label><input name="name" type="text" defaultValue={currentUser.name} onChange={handleChange}/>
                        <label htmlFor="email">Email</label><input name="email" type="email" key="edit_name" defaultValue={currentUser.email} onChange={handleChange} />
                        <label htmlFor="website">Site Web</label><input name="website" key="edit_website" defaultValue={currentUser.website} onChange={handleChange} />
                        <label htmlFor="address_suite">N°</label><input name="address_suite" key="edit_addsuite" defaultValue={currentUser.address.suite} onChange={handleChange} />
                        <label htmlFor="address_street">Rue</label><input name="address_street" key="edit_add_street" defaultValue={currentUser.address.street} onChange={handleChange} />
                        <label htmlFor="address_zipcode">Code Postal</label><input name="address_zipcode" key="edit_addZip" defaultValue={currentUser.address.zipcode} onChange={handleChange} />
                        <label htmlFor="address_city">Ville</label><input name="address_city" key="edit_addcity" defaultValue={currentUser.address.city} onChange={handleChange} />
                    </div>
                    <div className="text-center">
                        <button onClick={saveEditUser}>Mettre à jour</button><br/>
                        &nbsp;<br/>
                        <button onClick={cancelUser} className="btn-secondary">Annuler</button>
                    </div>                    
                    </>
                }{
                    (mode==='create')&&<>
                    <div className="text-center font-bold">Créer un nouvel utilisateur</div>
                    <div className="grid grid-cols-2 gap-4 p-4">
                    <label htmlFor="name">Nom</label><input name="name" type="text" onChange={handleChange}/>
                        <label htmlFor="email">Email</label><input name="email" type="email" key="edit_name" onChange={handleChange} />
                        <label htmlFor="website">Site Web</label><input name="website" key="edit_website" onChange={handleChange} />
                        <label htmlFor="address_suite">N°</label><input name="address_suite" key="edit_addsuite" onChange={handleChange} />
                        <label htmlFor="address_street">Rue</label><input name="address_street" key="edit_add_street" onChange={handleChange} />
                        <label htmlFor="address_zipcode">Code Postal</label><input name="address_zipcode" key="edit_addZip" onChange={handleChange} />
                        <label htmlFor="address_city">Ville</label><input name="address_city" key="edit_addcity" onChange={handleChange} />
                    </div>
                    <div className="text-center">
                        <button onClick={saveCreateUser}>Créer un nouvel utilisateur</button><br/>
                        &nbsp;<br/>
                        <button onClick={cancelUser} className="btn-secondary">Annuler</button>
                    </div>
                    </>
                }{
                    (mode==='error')&&<>
                    <div className="text-center font-bold">Erreur</div>
                    <div className="">{ erreur }</div>
                    <br/>
                    <div className="text-center"><button onClick={cancelUser}>Ok</button></div>
                    </>
                }{
                    (mode==='detail')&&<>
                    <div className="text-center m-4">Détail pour : <b>{currentUser.name}</b></div>
                    <div className="grid grid-cols-2 gap-4">
                        <b>Id </b><span>{currentUser.id}</span>
                        <b>email </b><span>{currentUser.email}</span>
                        <b>Site internet</b><span>{currentUser.website}</span>
                        <b>Addresse </b><span>{currentUser.address.suite} {currentUser.address.street}</span>
                        <b></b><span>{currentUser.address.zipcode} {currentUser.address.city}</span>
                    </div>
                    <div className="text-center m-4"><button onClick={cancelUser}>Annuler</button></div>
                    </>
                }{
                    (mode==='delete')&&<>
                    <div className="text-center font-bold">Confirmer la suppression de "{currentUser.name}"</div>
                    <div className="grid grid-cols-2 gap-4 p-4">
                        <span className="text-center"><button onClick={ComfirmeDeleteUser}>Supprimer</button></span>
                        <span className="text-center"><button className="btn-secondary" onClick={cancelUser}>Annuler</button></span>
                    </div>
                    </>
                }
                </div>
            </div>
        </div>
        }
        <div className="text-center text-2xl">Les utilisateurs enregistrés sont :</div>
        <br/>
        <div className="text-right">
            <u onClick={createUser} className="cursor-pointer">Créer d'utilisateur</u>
        </div>
        <br/>
        <div className="userWrapTbl">
        <div className="usersTbl">
            <b>#</b>
            <b>Nom de l'utilisateur</b>
            <b>Adresse électronique</b>
            <b>Numéro de téléphone</b>
            <b></b>
        </div>
        {
        users.filter((u,i) => {
            let IndexStartPage = page*pageSize
            let IndexEndPage = IndexStartPage + pageSize
            if (i<IndexStartPage) return false
            if (i>=IndexEndPage) return false
            return true
        }).map((u,i) =><>
            <div className="usersTbl even:bg-gray-100" key={`listing_user_${i}`}>
                <b>{u.id}</b>
                <span>{u.name}</span>
                <span>{u.email}</span>
                <span>{u.phone}</span>
                <u onClick={showDetailUser} data-id={u.id} className="inline-block px-4">Détails</u>
                <u onClick={EditUser} data-id={u.id} className="inline-block px-4">Editer</u>
                <u onClick={DeleteUser} data-id={u.id} className="inline-block px-4">Supprimer</u>
            </div>
        </> )
        }{
            (!users.length)&&<div className="text-center text-red-500 font-bold">Aucune donnée a été trouvé</div>
        }
        <br/>
        {
        (users.length>0)&&<>
            <div className="text-center m-4">
                <span className="bg-gray-300 py-2 px-4 m-2 cursor-pointer" data-page={0} onClick={changePage}>1</span>
                {
                    Object.keys(
                        Array(
                            Math.max(
                                0,
                                Math.floor((users.length-1)/pageSize)
                            )
                        ).fill(0)
                    ).map(p =><>
                        <span className={'bg-gray-300 px-4 py-2 m-2 cursor-pointer '+(((p*1+1)===page)?' pageActive':'')} data-page={p*1+1} onClick={changePage}>{p*1+2}</span>
                    </>)
                }
            </div>
        </>
        }
    </div>
    </>
}

export default UserPage