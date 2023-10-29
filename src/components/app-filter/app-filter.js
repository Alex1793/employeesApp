import "./app-filter.css";

const AppFilter = ({onUpdateFilter, filtered}) => {

    function getName (e) {
        onUpdateFilter(e.target.name);
    }

    return (
        <div className="btn-group">
            <button type="button"
                    className={filtered === '' ? 'btn btn-light' : 'btn btn-outline-light'}
                    onClick={getName}>
                    Все сотрудники
            </button>
            <button type="button"
                    className={filtered === 'rise' ? 'btn btn-light' : 'btn btn-outline-light'}
                    name="rise"
                    onClick={getName}>
                    На повышение
            </button>
            <button type="button"
                    className={filtered === 'more1000' ? 'btn btn-light' : 'btn btn-outline-light'}
                    name="more1000"
                    onClick={getName}>
                    З/П больше 1000$
            </button>
        </div>
    )
}

export default AppFilter;