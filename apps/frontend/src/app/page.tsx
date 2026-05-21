'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandIcon } from '@/components/brand/BrandIcon';
import { Input } from '@/components';
import { Button } from '@/components';
import { Checkbox } from '@/components';
import { Card, CardContent } from '@/components';
import { Badge } from '@/components';
import { Separator } from '@/components';
import { cn } from '@/utils/cn';
import useMultiLanguage from '@/hooks/useMultiLanguage';
import type { Todo, TodoFilter } from '@/types';

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export default function TodoPage() {
  const { TODO_APP } = useMultiLanguage();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = useCallback(() => {
    const text = inputValue.trim();
    if (!text) return;
    setTodos((prev) => [
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
    setInputValue('');
    inputRef.current?.focus();
  }, [inputValue]);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  const filters: { key: TodoFilter; label: string }[] = [
    { key: 'all', label: TODO_APP.ALL },
    { key: 'active', label: TODO_APP.ACTIVE },
    { key: 'completed', label: TODO_APP.COMPLETED },
  ];

  const emptyMessage =
    filter === 'active'
      ? TODO_APP.EMPTY_STATE_ACTIVE
      : filter === 'completed'
        ? TODO_APP.EMPTY_STATE_COMPLETED
        : TODO_APP.EMPTY_STATE;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col px-4 py-8 sm:py-12">
        <header className="mb-8 flex items-center gap-3 sm:mb-12">
          <BrandIcon sizePx={36} />
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              {TODO_APP.TITLE}
            </h1>
            <p className="text-sm text-muted-foreground">
              {TODO_APP.SUBTITLE}
            </p>
          </div>
        </header>

        <section aria-label="Add task" className="mb-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTodo();
            }}
            className="flex gap-2"
          >
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={TODO_APP.PLACEHOLDER}
              aria-label={TODO_APP.PLACEHOLDER}
              className="flex-1 min-w-0"
            />
            <Button
              type="submit"
              disabled={!inputValue.trim()}
              className="cursor-pointer shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {TODO_APP.ADD}
            </Button>
          </form>
        </section>

        <section aria-label="Filter tasks" className="mb-4">
          <div className="flex gap-1 rounded-lg bg-muted p-1">
            {filters.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={cn(
                  'cursor-pointer flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  filter === key
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <section
          aria-label="Task list"
          className="flex-1"
          aria-live="polite"
        >
          <AnimatePresence mode="popLayout">
            {filteredTodos.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">{emptyMessage}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                className="space-y-2"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.04 } },
                }}
              >
                {filteredTodos.map((todo) => (
                  <motion.div
                    key={todo.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <Card className="group transition-colors hover:border-primary/30">
                      <CardContent className="flex items-center gap-3 py-3">
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={() => toggleTodo(todo.id)}
                          aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                          className="cursor-pointer shrink-0"
                        />
                        <span
                          className={cn(
                            'flex-1 min-w-0 text-sm transition-colors',
                            todo.completed
                              ? 'text-muted-foreground line-through'
                              : 'text-foreground'
                          )}
                        >
                          {todo.text}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteTodo(todo.id)}
                          aria-label={`Delete "${todo.text}"`}
                          className="cursor-pointer shrink-0 rounded-md p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive focus:opacity-100 focus:text-destructive"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {todos.length > 0 && (
          <>
            <Separator className="my-4" />
            <footer className="flex items-center justify-between text-sm">
              <Badge variant="secondary" className="font-normal">
                {activeCount} {TODO_APP.ITEMS_LEFT}
              </Badge>
              {completedCount > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearCompleted}
                  className="cursor-pointer text-muted-foreground hover:text-destructive"
                >
                  {TODO_APP.CLEAR_COMPLETED}
                </Button>
              )}
            </footer>
          </>
        )}
      </div>
    </main>
  );
}