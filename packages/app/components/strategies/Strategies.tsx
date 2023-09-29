"use client";

import { Tab } from "@headlessui/react";

import { Strategy, useStrategyContext } from "@/contexts";
import { tabButtonStyles } from "@/app/stacks/stacksOrders";

import { StrategyCard } from "./StrategyCard";
import { STRATEGY_CATEGORIES } from "./constants";

export const Strategies = () => {
  const { selectedStrategy, setSelectedStrategy } = useStrategyContext();

  const strategyCategories = Object.values(STRATEGY_CATEGORIES);

  return (
    <div className="max-w-lg mx-auto mt-8">
      <Tab.Group>
        <Tab.List className="mb-2">
          <div className="flex space-x-2">
            {strategyCategories.map((category, catIndex) => (
              <Tab
                className={tabButtonStyles}
                key={catIndex}
                onClick={() => setSelectedStrategy(null)}
              >
                {category.label}
              </Tab>
            ))}
          </div>
        </Tab.List>
        <Tab.Panels>
          {strategyCategories.map((category, catIndex) => (
            <Tab.Panel
              className="grid sm:grid-cols-1 lg:grid-cols-2 lg:gap-x-4 gap-y-3.5"
              key={catIndex}
            >
              {category.strategies.map((strategy: Strategy, stratIndex) => {
                const isSelected = selectedStrategy?.id === strategy.id;

                return (
                  <StrategyCard
                    key={stratIndex}
                    onClick={() =>
                      setSelectedStrategy(isSelected ? null : strategy)
                    }
                    selected={isSelected}
                    strategy={strategy}
                  />
                );
              })}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
