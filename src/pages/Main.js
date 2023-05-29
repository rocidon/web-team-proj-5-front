import Bulletin from "../components/Bulletin";

function Main() {
    return (<div>
        {
            [1, 2, 3].map(() => {
                return (<Bulletin />)
            })
        }
    </div>)
}
export default Main;