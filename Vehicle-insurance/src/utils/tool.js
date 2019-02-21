export function formatToTree(list) {
	let tempList = []
	for(let i in list){
		let obj = {
			id: list[i].id,
			label: list[i].functionName,
		}
		tempList.push(obj)
	}
  	return tempList
}
export function formatAreasTree(list) {
	let tempList = []
	for(let i in list){
		let obj = {
			value: list[i].id,
			label: list[i].name,
		}
		tempList.push(obj)
	}
  	return tempList
}
export function formatTomMnueTree(list) {
	const tempList = []
	for(let i in list){
		let obj = {
			id: list[i].id,
			label: list[i].menuName,
		}
		if(!list[i].parentId){
			const tempArray = [] 
			for(let t in list){
				if(list[t].parentId === list[i].id){
					let obj2 = {
						id: list[t].id,
						label: list[t].menuName,
					}
					tempArray.push(obj2)
				}
			}
			obj.children = tempArray
			tempList.push(obj)
		}
	}
  	return tempList
}
