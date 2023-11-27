"use client";

import { Tab } from "@headlessui/react";

import { Strategy, useStackboxFormContext } from "@/contexts";
import { tabButtonStyles } from "@/components";

import { StrategyCard } from "./StrategyCard";
import { STRATEGY_CATEGORIES } from "./constants";

export const Strategies = () => {
  const { stackboxFormState } = useStackboxFormContext();
  const [chainId] = stackboxFormState.chainIdState;

  const chainStrategies = STRATEGY_CATEGORIES[chainId];

  if (!chainStrategies) return null;

  const strategyCategories = Object.values(STRATEGY_CATEGORIES[chainId]);

  return (
    <div className="max-w-lg mx-auto">
      <Tab.Group>
        <Tab.List className="mb-2">
          <div className="flex space-x-2">
            {strategyCategories.map((category, catIndex) => (
              <Tab className={tabButtonStyles} key={catIndex}>
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
              {category.strategies.map((strategy: Strategy, stratIndex) => (
                <StrategyCard key={stratIndex} strategy={strategy} />
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
