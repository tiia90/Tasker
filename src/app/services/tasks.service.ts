import { Injectable } from '@angular/core';
import { StorageItem } from '../shared/noteItem';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: StorageItem[] = [];

  constructor(private storage: Storage) {
    this.storage.create();
    this.getTasks().then(
      data => this.tasks = data == null ?  [] : data
    );
  }

  public getTasks(): Promise<StorageItem[]> {
    return this.storage.get('tasks');
  }

  public getTask(id: number): StorageItem {
    return this.tasks.filter(t => t.id == id)[0];
  }

  public saveTask(t: StorageItem): Promise<boolean> {
    if (t.id == undefined) {
      // New task
      const maxId = this.tasks.reduce((max, t) => t.id > max? t.id : max, -1);
      const newTask = {id: maxId + 1, title: t.title, content: t.content, lastUpdated: t.lastUpdated, done: false,dateForFilter: t.dateForFilter, isActive:false};
      this.tasks.push(newTask);
    } else {
      // Edit task
      this.deleteTask(t.id);
      this.tasks.push(t);
      this.tasks.sort((t1, t2) => t1.id < t2.id ? -1 : 1);
    }
    return this.storage.set('tasks', this.tasks);
  }

  
  public deleteTask(id: number): Promise<boolean> {
    this.tasks = this.tasks.filter(t => t.id != id);
    return this.storage.set('tasks', this.tasks);
  }
}