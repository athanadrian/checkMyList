import { Observable } from 'rxjs/Observable';


export class ChecklistModel {

    checklist: any;
    checklistObserver: any;

    constructor(public title: string, public items: any[]) {
        this.items = items;

        //create our observable
        this.checklist=Observable.create(observer=>{
            this.checklistObserver=observer;
        });
    }

    //Add item to checklist
    addItem(item): void {
        this.items.push({
            title: item,
            checked: false
        });

        this.checklistObserver.next(true);
    }

    //Delete item from checklist
    removeItem(item) {
        let index = this.items.indexOf(item);
        //if item exists not undefined
        if (index > -1) {
            //remove 1 item(index) from array
            this.items.splice(index, 1);
        }
        this.checklistObserver.next(true);
    }

    //Edit item of checklist
    renameItem(item, title) {
        let index = this.items.indexOf(item);
        //if item exists not undefined
        if (index > -1) {
            //replace item's title with new title
            this.items[index].title = title;
        }
        this.checklistObserver.next(true);
    }

    //Setter title
    setTitle(title) {
        this.title = title;
        this.checklistObserver.next(true);
    }

    //Hide item change state of item
    toggleItem(item): void {
        item.checked = !item.checked;
        this.checklistObserver.next(true);
    }
}