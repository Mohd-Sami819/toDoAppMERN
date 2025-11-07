export default function Protected({children}){
    if (!localStorage.getItem('login')) {
        
        return children;
    }
}