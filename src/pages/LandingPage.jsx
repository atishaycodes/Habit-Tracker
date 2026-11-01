import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  ArrowRight,
  Repeat2,
  Layers,
  Clock3,
  CalendarDays,
  Target,
  BarChart3,
  Flame,
  ChevronDown,
  Check,
  Plus,
  Menu,
  X,
  ShieldCheck,
  Smartphone,
  TrendingUp,
} from 'lucide-react'
import InteractiveProductDemo from '../components/InteractiveProductDemo'

const LandingPage = () => {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'routines' | 'analytics'
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const scrollToSection = (id) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const faqs = [
    {
      q: 'What is HabitFlow?',
      a: 'HabitFlow is a calm, modern productivity platform designed to help you track habits, organise routines, run structured focus sessions, and review your progress over time without overwhelm.',
    },
    {
      q: 'How do I get started?',
      a: 'You can begin immediately without any complicated setup. Simply launch the application, click "Add Habit", specify your target schedule, and start checking in each day.',
    },
    {
      q: 'Can I create my own habits with custom targets?',
      a: 'Yes. HabitFlow supports flexible yes/no habits, numeric count-based habits (such as glasses of water or pages read), and duration-based habits (such as meditation or workout minutes).',
    },
    {
      q: 'Can I organise habits into routines?',
      a: 'Yes. You can group related habits into Morning, Afternoon, or Evening routines, and execute them step-by-step with an interactive routine runner.',
    },
    {
      q: 'Can I track my progress over time?',
      a: 'Yes. HabitFlow provides daily completion percentages, streak counts, a GitHub-style activity contribution heatmap, and weekly rhythm charts to visualise your consistency.',
    },
    {
      q: 'Does HabitFlow work on mobile devices?',
      a: 'Yes. The application is fully responsive and designed to work seamlessly on phones, tablets, laptops, and desktop screens.',
    },
    {
      q: 'How is my data stored?',
      a: 'Your data is securely stored locally in your browser. You can export a complete backup in JSON or CSV format anytime and import it on another device whenever you like.',
    },
  ]

  return (
    <div className="min-h-screen bg-white text-[#172033] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* =========================================================================
          1. NAVBAR
         ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="h-4.5 w-4.5 stroke-[2.5]" />
            </div>
            <span className="font-semibold text-base tracking-tight text-[#172033]">
              HabitFlow
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#64748B]">
            <button
              onClick={() => scrollToSection('product')}
              className="hover:text-[#172033] transition-colors"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-[#172033] transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-[#172033] transition-colors"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-[#172033] transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-3.5 py-1.5 text-xs font-medium text-[#64748B] hover:text-[#172033] transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/dashboard"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg shadow-xs transition-colors"
            >
              Get started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#64748B] hover:text-[#172033] hover:bg-[#F8FAFC]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#E2E8F0] bg-white px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection('product')}
              className="block w-full text-left py-2 text-sm font-medium text-[#64748B] hover:text-[#172033]"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left py-2 text-sm font-medium text-[#64748B] hover:text-[#172033]"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left py-2 text-sm font-medium text-[#64748B] hover:text-[#172033]"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left py-2 text-sm font-medium text-[#64748B] hover:text-[#172033]"
            >
              FAQ
            </button>
            <div className="pt-3 border-t border-[#E2E8F0] flex flex-col gap-2">
              <Link
                to="/dashboard"
                className="w-full text-center py-2 text-xs font-medium text-[#64748B] border border-[#E2E8F0] rounded-lg"
              >
                Sign in
              </Link>
              <Link
                to="/dashboard"
                className="w-full text-center py-2 text-xs font-semibold text-white bg-[#2563EB] rounded-lg shadow-xs"
              >
                Get started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          2. HERO SECTION
         ========================================================================= */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: Content */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase">
                Personal productivity, made simple
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-[46px] font-bold text-[#172033] tracking-tight leading-[1.12]">
                Build better habits. <br />
                <span className="text-[#2563EB]">One day at a time.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                HabitFlow helps you build consistent routines, stay focused on your goals,
                and see the progress you're making every day.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors shadow-xs"
                >
                  <span>Get started</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  onClick={() => scrollToSection('features')}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-medium text-[#172033] bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors"
                >
                  Explore features
                </button>
              </div>

              <p className="text-xs text-[#94A3B8] pt-1">
                Your personal space for habits, routines and focus. Free to use locally.
              </p>
            </div>

            {/* Right: Automated Interactive Showcase */}
            <div id="product-demo" className="lg:col-span-7">
              <InteractiveProductDemo />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. PRODUCT INTRODUCTION SECTION
         ========================================================================= */}
      <section className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033]">
              Consistency is easier when you can see your progress.
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Build a routine that fits your day. Track the small actions that add up over time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-white space-y-3 shadow-2xs">
              <div className="h-10 w-10 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                <Repeat2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-[#172033]">
                Design your daily routine
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Break your day into manageable time slots: morning, afternoon, and evening.
                Focus on the right actions at the right time.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-white space-y-3 shadow-2xs">
              <div className="h-10 w-10 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-[#172033]">
                Visual feedback that motivates
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Clean streaks, weekly overview bars, and contribution heatmaps give you honest,
                rewarding momentum without cognitive clutter.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-white space-y-3 shadow-2xs">
              <div className="h-10 w-10 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-[#172033]">
                All your productivity unified
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Habits, step-by-step routines, focus sessions, and tasks work together harmoniously
                inside a calm and single interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FEATURES SECTION
         ========================================================================= */}
      <section id="features" className="py-24 border-b border-[#E2E8F0] scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#172033]">
              Everything you need to stay consistent.
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Purpose-built tools designed to make personal productivity calm, organized, and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#CBD5E1] transition-all space-y-4">
              <div className="h-10 w-10 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                <Repeat2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#172033]">Habit Tracking</h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Create habits that fit your schedule. Support for simple yes/no checks, count targets,
                  and duration goals with instant streak tracking.
                </p>
              </div>
              <div className="pt-2 border-t border-[#F1F5F9] text-[11px] text-[#64748B] flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                Daily & weekly frequencies with category tags
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#CBD5E1] transition-all space-y-4">
              <div className="h-10 w-10 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#172033]">Routines</h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Bring related habits together into morning or evening routines. Run through them
                  step-by-step with an interactive routine runner.
                </p>
              </div>
              <div className="pt-2 border-t border-[#F1F5F9] text-[11px] text-[#64748B] flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                Step-by-step completion flow with timer
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#CBD5E1] transition-all space-y-4">
              <div className="h-10 w-10 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                <Clock3 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#172033]">Focus Sessions</h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Make time for focused work with structured focus timers (25m, 45m, 60m). Log sessions
                  and associate them with specific habits.
                </p>
              </div>
              <div className="pt-2 border-t border-[#F1F5F9] text-[11px] text-[#64748B] flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                Distraction-free timer with session history
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#CBD5E1] transition-all space-y-4">
              <div className="h-10 w-10 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#172033]">Goals & Milestones</h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Turn bigger ambitions into tangible milestones. Connect daily habit execution
                  with long-term personal or professional goals.
                </p>
              </div>
              <div className="pt-2 border-t border-[#F1F5F9] text-[11px] text-[#64748B] flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                Target dates and percentage progress bars
              </div>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#CBD5E1] transition-all space-y-4">
              <div className="h-10 w-10 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#172033]">Calendar & Activity</h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Understand your consistency through your daily and weekly activity. View your
                  completion heatmap and inspect historical records.
                </p>
              </div>
              <div className="pt-2 border-t border-[#F1F5F9] text-[11px] text-[#64748B] flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                Monthly calendar and year-long activity grid
              </div>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#CBD5E1] transition-all space-y-4">
              <div className="h-10 w-10 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#172033]">Analytics & Insights</h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  See which habits are thriving and identify areas for improvement. Track overall
                  completion percentages and current best streaks.
                </p>
              </div>
              <div className="pt-2 border-t border-[#F1F5F9] text-[11px] text-[#64748B] flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                Weekly rhythm charts and habit performance table
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. PRODUCT SHOWCASE SECTION (DEEP DIVE)
         ========================================================================= */}
      <section id="product" className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
              Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#172033]">
              Your progress, all in one place.
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Designed from the ground up for clarity, speed, and daily use.
            </p>
          </div>

          {/* Interactive Showcase Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-xl bg-white border border-[#E2E8F0] text-xs font-medium">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-[#2563EB] text-white font-semibold shadow-xs'
                    : 'text-[#64748B] hover:text-[#172033]'
                }`}
              >
                Daily Overview
              </button>
              <button
                onClick={() => setActiveTab('routines')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'routines'
                    ? 'bg-[#2563EB] text-white font-semibold shadow-xs'
                    : 'text-[#64748B] hover:text-[#172033]'
                }`}
              >
                Structured Routines
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'analytics'
                    ? 'bg-[#2563EB] text-white font-semibold shadow-xs'
                    : 'text-[#64748B] hover:text-[#172033]'
                }`}
              >
                Analytics & Calendar
              </button>
            </div>
          </div>

          {/* Showcase Display Card */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB]">
                    <Repeat2 className="h-4 w-4" />
                    <span>Daily Overview</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#172033]">
                    Stay focused on today's highest leverage habits.
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    Check in with your morning, afternoon, and evening habits at a glance.
                    Update counts directly from the card, see real-time completion rates,
                    and keep your streak intact.
                  </p>
                  <ul className="space-y-2 text-xs text-[#64748B] pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                      Filter instantly by time of day or habit category
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                      Count and duration steppers right on the card
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                      Immediate streak calculation and undo action
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-7 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                    <span className="text-xs font-semibold text-[#172033]">Today's Habits</span>
                    <div className="flex gap-1">
                      <span className="px-2 py-0.5 rounded bg-[#2563EB] text-white text-[10px] font-medium">All</span>
                      <span className="px-2 py-0.5 rounded text-[#64748B] text-[10px]">Morning</span>
                      <span className="px-2 py-0.5 rounded text-[#64748B] text-[10px]">Evening</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded bg-[#2563EB] text-white flex items-center justify-center">
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#172033] line-through text-[#64748B]">
                          Drink 2L water
                        </div>
                        <div className="text-[10px] text-[#94A3B8]">Health • Morning</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-medium text-[#2563EB] bg-[#EFF6FF] px-2 py-1 rounded">
                      4/4 glasses
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded border border-[#CBD5E1] bg-white flex items-center justify-center" />
                      <div>
                        <div className="text-xs font-semibold text-[#172033]">Read 15 pages</div>
                        <div className="text-[10px] text-[#94A3B8]">Learning • Evening</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button className="px-2 py-0.5 rounded border border-[#E2E8F0] text-xs hover:bg-[#F8FAFC]">-</button>
                      <span className="text-xs font-mono px-1">0/15</span>
                      <button className="px-2 py-0.5 rounded border border-[#E2E8F0] text-xs hover:bg-[#F8FAFC]">+</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'routines' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB]">
                    <Layers className="h-4 w-4" />
                    <span>Structured Routines</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#172033]">
                    Group complementary habits into natural flows.
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    Instead of feeling overwhelmed by a dozen standalone habits, bundle them into
                    cohesive routines. Launch the interactive Routine Runner to check off each step
                    smoothly.
                  </p>
                  <ul className="space-y-2 text-xs text-[#64748B] pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                      Morning Jumpstart & Evening Wind-Down routines
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                      Integrated step-by-step modal guide
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                      Automatic completion sync with your daily habits
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-7 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-5 space-y-3">
                  <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                          ☀️
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#172033]">Morning Jumpstart</h4>
                          <span className="text-[10px] text-[#64748B]">3 habits • ~25 mins</span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                        2 / 3 done
                      </span>
                    </div>

                    <div className="h-1.5 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div className="h-full bg-[#2563EB] rounded-full" style={{ width: '66%' }} />
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                      <div className="p-2 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-[#16A34A]" />
                        <span className="truncate">Hydrate</span>
                      </div>
                      <div className="p-2 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-[#16A34A]" />
                        <span className="truncate">Stretch</span>
                      </div>
                      <div className="p-2 rounded bg-white border border-[#CBD5E1] flex items-center gap-1.5 text-[#64748B]">
                        <span className="h-2 w-2 rounded-full bg-slate-300"></span>
                        <span className="truncate">Plan Day</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB]">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics & Activity</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#172033]">
                    See how your daily actions compound over months.
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    View your complete habit history with a contribution-style heatmap, weekly rhythm
                    breakdowns, and detailed completion rates for every single habit.
                  </p>
                  <ul className="space-y-2 text-xs text-[#64748B] pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                      GitHub-style contribution squares show consistency
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                      Weekly rhythm charts reveal peak focus days
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                      Longest streaks and performance scores
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-7 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-5 space-y-3">
                  <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#172033]">Activity Heatmap</span>
                      <span className="text-[10px] text-[#94A3B8]">Last 12 weeks</span>
                    </div>

                    {/* Mini contribution grid */}
                    <div className="grid grid-cols-12 gap-1.5 pt-1">
                      {Array.from({ length: 60 }).map((_, i) => {
                        const level = i % 7 === 0 ? 'bg-[#93C5FD]' : i % 5 === 0 ? 'bg-[#2563EB]' : i % 3 === 0 ? 'bg-[#60A5FA]' : 'bg-[#E2E8F0]'
                        return (
                          <div
                            key={i}
                            className={`h-3 w-3 rounded-xs ${level}`}
                          />
                        )
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
                      <span>Weekly consistency: 84%</span>
                      <span className="font-mono text-[#2563EB]">Current: 7 days</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. HOW IT WORKS SECTION
         ========================================================================= */}
      <section id="how-it-works" className="py-24 border-b border-[#E2E8F0] scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
              Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#172033]">
              Getting started is simple.
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              No complex setup. Start tracking your first habit in less than a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-white space-y-4 relative">
              <span className="text-2xl font-mono font-bold text-[#2563EB] block">
                01
              </span>
              <h3 className="text-lg font-bold text-[#172033]">Create your habits</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Choose the habits you want to build and set a schedule that works for you. Pick target counts,
                duration goals, and time of day.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-white space-y-4 relative">
              <span className="text-2xl font-mono font-bold text-[#2563EB] block">
                02
              </span>
              <h3 className="text-lg font-bold text-[#172033]">Stay consistent</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Check in as you complete your habits throughout the day. Run structured focus sessions or routines
                to keep your daily momentum moving.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-white space-y-4 relative">
              <span className="text-2xl font-mono font-bold text-[#2563EB] block">
                03
              </span>
              <h3 className="text-lg font-bold text-[#172033]">See your progress</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Review your streaks, activity heatmaps, and consistency metrics as you build routines that last
                weeks and months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. DEDICATED PRODUCT BENEFIT SECTION
         ========================================================================= */}
      <section className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 sm:p-12 shadow-sm">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
                The Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033]">
                Small actions. Real progress.
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Building lasting habits is about consistency rather than perfection. HabitFlow gives you a calm,
                distraction-free space to show up every day, track honest progress, and create routines that fit
                your real life.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#F1F5F9]">
              <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-xs font-bold text-[#172033] block">No Distractions</span>
                <span className="text-xs text-[#64748B] mt-0.5 block">
                  Clean interface with zero ads, intrusive popups, or unnecessary social feeds.
                </span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-xs font-bold text-[#172033] block">Total Data Privacy</span>
                <span className="text-xs text-[#64748B] mt-0.5 block">
                  Your data remains in your control. Export and backup your logs anytime.
                </span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-xs font-bold text-[#172033] block">Built for Daily Use</span>
                <span className="text-xs text-[#64748B] mt-0.5 block">
                  Keyboard shortcuts (Ctrl+K), quick add actions, and rapid check-in controls.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FAQ SECTION
         ========================================================================= */}
      <section id="faq" className="py-24 border-b border-[#E2E8F0] scroll-mt-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
              Questions & Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#172033]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Everything you need to know about how HabitFlow works.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div
                  key={index}
                  className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-[#172033] hover:text-[#2563EB] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#94A3B8] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#2563EB]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#F8FAFC] pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. FINAL CALL TO ACTION SECTION
         ========================================================================= */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="h-12 w-12 rounded-xl bg-[#EFF6FF] text-[#2563EB] mx-auto flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#172033]">
              Start building a better routine.
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] max-w-lg mx-auto">
              Make space for the habits that matter to you. Get started for free today.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors shadow-xs"
            >
              <span>Get started with HabitFlow</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. FOOTER
         ========================================================================= */}
      <footer className="py-12 bg-white text-[#64748B] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shadow-xs">
                <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
              </div>
              <span className="font-semibold text-sm tracking-tight text-[#172033]">
                HabitFlow
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-[11px] text-[#94A3B8]">
                Calm, focused personal productivity platform.
              </span>
            </div>

            <nav className="flex flex-wrap items-center gap-6 font-medium">
              <button
                onClick={() => scrollToSection('product')}
                className="hover:text-[#172033] transition-colors"
              >
                Product
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="hover:text-[#172033] transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="hover:text-[#172033] transition-colors"
              >
                How it works
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="hover:text-[#172033] transition-colors"
              >
                FAQ
              </button>
              <Link to="/dashboard" className="text-[#2563EB] hover:underline font-semibold">
                Open App
              </Link>
            </nav>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#94A3B8]">
            <p>© {new Date().getFullYear()} HabitFlow. All rights reserved.</p>
            <p>Designed for daily consistency, calm focus, and personal progress.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

