
ReactDOM.render(
    <div id="panel" className="container text-center my-4 p-5">
        <div className="row">
        <h1 className="col">Secret Santa</h1>
        </div>
        <div className="row">
            <label className="col">Create a room</label>
        </div>
        <div>
            <button className="btn btn-primary m-3" onClick={()=> {hostEnter()}}>host</button>
        </div>
    </div>
    ,
    document.getElementById("mainWindow")
)

