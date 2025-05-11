'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Dictionary } from '@/lib/getDictionaryClient';

interface ThemeToggleProps {
  dictionary: Pick<Dictionary, 'themeToggleLight' | 'themeToggleDark' | 'themeToggleSystem'>;
}

export function ThemeToggle({ dictionary }: ThemeToggleProps) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          {dictionary.themeToggleLight}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          {dictionary.themeToggleDark}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          {dictionary.themeToggleSystem}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}