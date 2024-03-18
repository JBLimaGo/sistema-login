import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    gap: 20px; 

  
*{
    padding: 0;
    margin: 0;
    font-family: Helvetica;
    color: #333;
    box-sizing: border-box;
}

body{
    background-image: url("../img/bg.jpg");
    background-position: center;
    background-size: cover;
}

button{
    background-color: #FDFDFD;
    color: #102f5e;    
    border: 2px solid  #102f5e;
    padding: .3rem .6rem;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s;
}

button:hover{
    background-color: #102f5e;    
    color: #fff;
}

button:hover > i{
    color: #fff;
}

button i{
    color: #102f5e;
    font-weight: bold;
    pointer-events: none;
}

input, 
select{
    padding: 0.25rem 0.5rem;
}

.hide{
    display: none;
}

/* Todo Header */
.todo-container{
    max-width: 450px;
    margin: 3rem auto;
    background-color: #FDFDFD;
    padding: 1.5rem;
    border-radius: 15px;
}
.todo-container header{
    text-align: center;
    padding: 0 1rem 1rem;
    border-bottom: 1px solid #ccc;
}

/* Todo Formulário */
#todo-form, #edit-form{
    padding: 1rem;
    border-bottom: 1px solid #ccc;    
}

#todo-form p,
#edit-form p {
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.form-control {
    display: flex;
}

.form-control input{
    margin-right: 0.3rem;
}

#cancel-edit-btn{
    margin-top: 1rem;
}

/* Todo Toolbar */

#toolbar{
    padding: 1rem;
    border-bottom: 1px solid #ccc;
    display: flex;
}

#toolbar h4{
    margin-bottom: 0.5rem;  
}

#search{
    border-right: 1px solid #ddd;
    padding-right: 1rem;
    margin-right: 1rem;
    width: 65%;
    display: flex;
    flex-direction: column;
}

#search form{
    display: flex;
}

#search input{
    width: 100%;
    margin-right: 0.3rem;
}

#filter{
    width: 35%;
    display: flex;
    flex-direction: column;
}

#filter select{
    flex: 1;
}

/* Todo List*/

.todo{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    transition: 0.3s;
}

.todo h3{
    flex: 1;
    font-size:  0.9rem;
}

.todo button{
    margin-left: 0.4rem;
}

.done{
    background-color: #395169;
}

.done h3{
    color: #fff;
    text-decoration: line-through;
    font-style: italic;
}





`;

export const Title = styled.h2``;