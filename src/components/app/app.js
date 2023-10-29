import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			data: [
				{name: 'Alex V.', salary: 800, increase: false, rise: false, id: 1},
				{name: 'Anna N.', salary: 1500, increase: false, rise: false, id: 2},
				{name: 'Vova M.', salary: 2100, increase: false, rise: false, id: 3},
			],
			term: '',
			filtered: ''
		}
		this.maxId = 4;
	}

	deleteItem = (id) => {
		this.setState(({data}) => {
			return {
				data: data.filter(item => item.id !== id)
			}
		})
	}

	addItem = (name, salary) => {
		const newItem = {
			name: name,
			salary: salary,
			increase: false,
			rise: false,
			id: this.maxId++
		}

		if(name.length <= 1 || salary < 500) return

		this.setState(({data}) => {
			return {
				data: [...data, newItem]
			}
		})
	}

	onToggleIncrese = (id) => {
		this.setState(({data}) => ({
			data: data.map(item => {
				if(item.id === id) {
					return {...item, increase: !item.increase}
				}

				return item;
			})
		}))
	}

	onToggleRise = (id) => {
		this.setState(({data}) => ({
			data: data.map(item => {
				if(item.id === id) {
					return {...item, rise: !item.rise}
				}

				return item;
			})
		}))
	}

	searchEmp = (items, term) => {
		if(term.length === 0) return items;
		
		return items.filter(item => {
			return item.name.indexOf(term) > -1;
		})
	}

	onUpdateSearch = (term) => {
		this.setState({term});
	}


	filterEmp = (filtered, items) => {
		switch (filtered) {
			case 'rise':
				return items.filter(item => item.rise);
			case 'more1000':
				return items.filter(item => item.salary >= 1000);
			default:
				return items;
		}
	}

	onUpdateFilter = (filter) => {
		this.setState({filtered: filter});
	}


	render () {

		const {data, term, filtered} = this.state;
		const calcEmp = this.state.data.length;
		const getIncrease = this.state.data.filter(item => item.increase).length;
		const visebleData = this.filterEmp(this.state.filtered ,this.searchEmp(data, term));

		return (
			<div className="app">
				<AppInfo calcEmp={calcEmp} getIncrease={getIncrease}/>
	
				<div className="search-panel">
					<SearchPanel onUpdateSearch={this.onUpdateSearch}/>
					<AppFilter onUpdateFilter={this.onUpdateFilter} filtered={filtered}/>
				</div>
				
				<EmployeesList data={visebleData} 
					onDelete={this.deleteItem}
					onToggleIncrese={this.onToggleIncrese}
					onToggleRise={this.onToggleRise}/>
				<EmployeesAddForm addItem={this.addItem}/>
			</div>
		);
	}
}

export default App;
