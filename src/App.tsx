/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { RecipeList } from './components/recipes/RecipeList';
import { RecipeDetail } from './components/recipes/RecipeDetail';
import { PastryStudioView } from './components/pastry/PastryStudioView';
import { WeeklyPlanner } from './components/planner/WeeklyPlanner';
import { FridgeChef } from './components/fridge/FridgeChef';
import { AIChefChat } from './components/assistant/AIChefChat';
import { HealthNutritionView } from './components/health/HealthNutritionView';
import { TestRunnerView } from './components/tests/TestRunnerView';
import { AndroidCertView } from './components/android/AndroidCertView';
import { SpecificationAuditModal } from './components/comparison/SpecificationAuditModal';
import { EncyclopediaCoverageModal } from './components/admin/EncyclopediaCoverageModal';
import { OpeningDedicationScreen } from './components/common/OpeningDedicationScreen';
import { RECIPES_DATA } from './data/recipes';
import { Recipe, AIPageContext } from './types';
import { ShoppingListModal } from './components/shopping/ShoppingListModal';
import { GoogleDriveModal } from './components/drive/GoogleDriveModal';
import { addRecipeIngredientsToShoppingList } from './services/shoppingService';
import { getUserHealthProfile, getWeightLogs, calculateTimedGoalPlan } from './services/healthService';
import { AdvancePrepAlertBanner } from './components/common/AdvancePrepAlertBanner';
import { Sparkles, X } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('recipes');
  const [activeRecipeId, setActiveRecipeId] = useState<string | null>(null);
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);
  const [showCoverageModal, setShowCoverageModal] = useState<boolean>(false);
  const [showShoppingModal, setShowShoppingModal] = useState<boolean>(false);
  const [showDriveModal, setShowDriveModal] = useState<boolean>(false);
  const [showGlobalAIChat, setShowGlobalAIChat] = useState<boolean>(false);

  // Initial Dedication & Bismillah Screen State (Shown ONLY before app starts)
  const [hasStarted, setHasStarted] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem('smart_chef_started_v2') === 'true';
      }
    } catch {}
    return false;
  });
  const [showDedicationModal, setShowDedicationModal] = useState<boolean>(false);

  const selectedRecipe = activeRecipeId ? RECIPES_DATA.find(r => r.id === activeRecipeId) : null;

  const handleStartApp = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('smart_chef_started_v2', 'true');
      }
    } catch {}
    setHasStarted(true);
    setShowDedicationModal(false);
  };

  const handleSelectRecipe = (id: string) => {
    setActiveRecipeId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setActiveRecipeId(null);
  };

  const handleTabChange = (tab: string) => {
    setActiveRecipeId(null);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToShoppingList = (recipe: Recipe, servings: number) => {
    addRecipeIngredientsToShoppingList(recipe, servings);
  };

  // Build real-time page context with FULL recipe details for AI Chef
  const getCurrentPageContext = (): AIPageContext => {
    if (activeRecipeId && selectedRecipe) {
      return {
        pageName: 'recipe_detail',
        pageTitleFa: `دستور پخت ${selectedRecipe.title}`,
        activeRecipe: {
          id: selectedRecipe.id,
          title: selectedRecipe.title,
          persianSubtitle: selectedRecipe.persianSubtitle,
          category: selectedRecipe.category,
          categoryNameFa: selectedRecipe.categoryNameFa,
          description: selectedRecipe.description,
          prepTimeMinutes: selectedRecipe.prepTimeMinutes,
          cookTimeMinutes: selectedRecipe.cookTimeMinutes,
          baseServings: selectedRecipe.baseServings,
          caloriesPerServing: selectedRecipe.caloriesPerServing,
          proteinGrams: selectedRecipe.proteinGrams,
          carbsGrams: selectedRecipe.carbsGrams,
          fatGrams: selectedRecipe.fatGrams,
          fiberGrams: selectedRecipe.fiberGrams,
          difficultyFa: selectedRecipe.difficultyFa,
          originRegion: selectedRecipe.originRegion,
          ingredients: selectedRecipe.ingredients.map(i => `${i.name}: ${i.amount} ${i.unit}${i.notes ? ` (${i.notes})` : ''}`),
          steps: selectedRecipe.steps.map(s => `مرحله ${s.stepNumber} [${s.title}${s.durationMinutes ? ` - ${s.durationMinutes} دقیقه` : ''}]: ${s.instruction}${s.proTip ? ` (نکته: ${s.proTip})` : ''}`),
          goldenTips: selectedRecipe.goldenTips,
          fullRecipeDetailsFa: `دستور پخت: «${selectedRecipe.title}» (${selectedRecipe.categoryNameFa}) | زمان آماده‌سازی: ${selectedRecipe.prepTimeMinutes} دقیقه | زمان پخت: ${selectedRecipe.cookTimeMinutes} دقیقه | سهم پایه: ${selectedRecipe.baseServings} نفر | کالری هر سهم: ${selectedRecipe.caloriesPerServing} kcal | پروتئین: ${selectedRecipe.proteinGrams}g | کربوهیدرات: ${selectedRecipe.carbsGrams}g | چربی: ${selectedRecipe.fatGrams}g | مواد اولیه: ${selectedRecipe.ingredients.map(i => `${i.name} ${i.amount}${i.unit}`).join('، ')}`
        }
      };
    }
    if (currentTab === 'health') {
      const profile = getUserHealthProfile();
      const logs = getWeightLogs();
      const timedGoal = calculateTimedGoalPlan(profile, logs);
      return {
        pageName: 'health',
        pageTitleFa: 'کلینیک سلامتی، رژیم غذایی و نمودار وزن',
        healthData: {
          weightKg: timedGoal.currentWeight,
          targetWeightKg: timedGoal.targetWeight,
          dailyCalories: timedGoal.targetDailyCalories,
          trajectoryStatusFa: timedGoal.trajectoryStatusFa,
          targetDaysRemaining: timedGoal.targetDays
        }
      };
    }
    if (currentTab === 'pastry') {
      return {
        pageName: 'pastry',
        pageTitleFa: 'استودیو قنادی و شیرینی'
      };
    }
    if (currentTab === 'planner') {
      return {
        pageName: 'planner',
        pageTitleFa: 'برنامه‌ریز هفتگی ۳ وعده (صبحانه، ناهار، شام)'
      };
    }
    if (currentTab === 'fridge') {
      return {
        pageName: 'fridge',
        pageTitleFa: 'سرآشپز یخچالی و موجودی انبار'
      };
    }
    return {
      pageName: 'recipes',
      pageTitleFa: 'بانک جامع دستور پخت و رسپی‌ها'
    };
  };

  const pageContext = getCurrentPageContext();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Vazirmatn',sans-serif]">
      {/* 1. INITIAL DEDICATION & BISMILLAH SCREEN (Shown ONLY before app starts, or on explicit request) */}
      {(!hasStarted || showDedicationModal) && (
        <OpeningDedicationScreen onStart={handleStartApp} />
      )}

      {/* Top Android App Bar - Clean and Decluttered */}
      <Header
        currentTab={currentTab}
        activeRecipeId={activeRecipeId}
        onBack={handleBack}
        onOpenShoppingModal={() => setShowShoppingModal(true)}
        onOpenDedication={() => setShowDedicationModal(true)}
        onOpenDriveModal={() => setShowDriveModal(true)}
      />

      {/* Main Content View Container */}
      <main className="flex-1 w-full max-w-md mx-auto">
        {activeRecipeId && selectedRecipe ? (
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={handleBack}
            onAddToShoppingList={handleAddToShoppingList}
          />
        ) : (
          <>
            {currentTab === 'recipes' && (
              <div className="space-y-4">
                <AdvancePrepAlertBanner onOpenRecipe={handleSelectRecipe} />
                <RecipeList onSelectRecipe={handleSelectRecipe} />
              </div>
            )}
            {currentTab === 'pastry' && (
              <PastryStudioView onSelectRecipe={handleSelectRecipe} />
            )}
            {currentTab === 'health' && (
              <HealthNutritionView onOpenRecipe={handleSelectRecipe} />
            )}
            {currentTab === 'planner' && (
              <WeeklyPlanner onOpenRecipe={handleSelectRecipe} />
            )}
            {currentTab === 'fridge' && (
              <FridgeChef onOpenRecipe={handleSelectRecipe} />
            )}
            {currentTab === 'assistant' && (
              <AIChefChat 
                pageContext={pageContext}
                onNavigate={(tab, rId) => {
                  if (rId) {
                    setActiveRecipeId(rId);
                  } else {
                    handleTabChange(tab);
                  }
                }} 
              />
            )}
            {currentTab === 'tests' && (
              <TestRunnerView />
            )}
            {currentTab === 'android' && (
              <AndroidCertView />
            )}
          </>
        )}
      </main>

      {/* Bottom Android Navigation */}
      <BottomNav
        currentTab={activeRecipeId ? '' : currentTab}
        onTabChange={handleTabChange}
      />

      {/* GLOBAL FLOATING AI BUTTON (حضور سراسری هوش مصنوعی در کل اپلیکیشن) */}
      {!showGlobalAIChat && currentTab !== 'assistant' && (
        <button
          onClick={() => setShowGlobalAIChat(true)}
          className="fixed bottom-20 left-4 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/25 active:scale-95 transition-all hover:scale-105 border border-amber-200/50"
          title="دستیار هوشمند سرآشپز با آگاهی از این صفحه"
        >
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>از سرآشپز بپرس</span>
        </button>
      )}

      {/* GLOBAL AI CHAT MODAL / DRAWER */}
      {showGlobalAIChat && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl w-full max-w-md h-[88vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200 overflow-hidden">
            <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">دستیار سراسری سرآشپز هوشمند</h3>
                  <p className="text-[10px] text-emerald-400 font-medium truncate max-w-[240px]">
                    آگاه از: {pageContext.pageTitleFa}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGlobalAIChat(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              <AIChefChat
                pageContext={pageContext}
                onClose={() => setShowGlobalAIChat(false)}
                onNavigate={(tab, rId) => {
                  setShowGlobalAIChat(false);
                  if (rId) {
                    setActiveRecipeId(rId);
                  } else {
                    handleTabChange(tab);
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Specification Audit & Comparison Modal */}
      <SpecificationAuditModal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
        onNavigateTab={handleTabChange}
      />

      {/* 130 Recipes & Verified Images Coverage Modal */}
      <EncyclopediaCoverageModal
        isOpen={showCoverageModal}
        onClose={() => setShowCoverageModal(false)}
        onSelectRecipe={(id: string) => {
          setShowCoverageModal(false);
          handleSelectRecipe(id);
        }}
      />

      {/* Smart Shopping List Modal */}
      <ShoppingListModal
        isOpen={showShoppingModal}
        onClose={() => setShowShoppingModal(false)}
      />

      {/* Google Drive Storage Modal */}
      <GoogleDriveModal
        isOpen={showDriveModal}
        onClose={() => setShowDriveModal(false)}
      />
    </div>
  );
}
