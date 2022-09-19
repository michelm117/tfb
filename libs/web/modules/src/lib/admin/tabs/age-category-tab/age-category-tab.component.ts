import { Component, OnInit } from '@angular/core';
import { AgeCategoryInterface } from '@tfb/api-interfaces';
import { AgeCategoryService } from '@tfb/web/data';

@Component({
  selector: 'tfb-age-category-tab',
  templateUrl: './age-category-tab.component.html',
  styleUrls: ['./age-category-tab.component.scss'],
})
export class AgeCategoryTabComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  editing: Map<number, boolean> = new Map<number, boolean>();

  categories: AgeCategoryInterface[] = [];

  constructor(private categoryService: AgeCategoryService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  private fetchCategories() {
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories.sort((a, b) => {
        return a.id - b.id;
      });
      let maxId = -1;
      categories.forEach((category) => {
        if (maxId <= category.id) {
          maxId = category.id + 1;
        }
      });
      this.categories.push({ id: maxId, name: '' });
      this.categories.forEach((category) => {
        this.editing.set(category.id, false);
      });
    });
  }

  updatedClicked(category: AgeCategoryInterface) {
    this.editing.set(category.id, false);

    this.categoryService.update(category).subscribe(() => {
      this.fetchCategories();
    });
  }

  delete(id: number) {
    this.categoryService.delete(id).subscribe(() => {
      this.fetchCategories();
    });
  }

  add(id: number) {
    const categories = this.categories.filter((category) => category.id === id);
    if (categories.length !== 1) {
      return;
    }
    const category = categories[0];
    this.categoryService.create(category.name).subscribe((res) => {
      this.fetchCategories();
    });
  }
}
