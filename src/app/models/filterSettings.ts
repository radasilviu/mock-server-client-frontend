import {ThemePalette} from '@angular/material/core';

export interface FilterSettings {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subcategories?: FilterSettings[];
}
