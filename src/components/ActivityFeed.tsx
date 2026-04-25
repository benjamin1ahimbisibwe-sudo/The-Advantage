import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency, formatDate } from '../utils/formatting';

export function ActivityFeed() {
  const { getActivities } = useFinance();

  const activities = getActivities();

  if (activities.length === 0) {
    return (
      <div className="section">
        <div className="section__header">
          <div className="section__title">Activity</div>
        </div>
        <div className="empty-state">
          <div className="empty-state__title">No activity yet</div>
          <p>Start by logging work hours or adding expenses</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="section__header">
        <div className="section__title">Activity</div>
      </div>
      <div className="activity-feed">
        {activities.map(activity => (
          <div key={activity.id} className="activity-entry">
            <div className="activity-entry__indicator">
              <div
                className={`activity-entry__icon ${
                  activity.type === 'income'
                    ? 'activity-entry__icon--income'
                    : 'activity-entry__icon--expense'
                }`}
              >
                {activity.type === 'income' ? '↑' : '↓'}
              </div>
            </div>
            <div className="activity-entry__content">
              <div className="activity-entry__description">
                {activity.description}
              </div>
              <div className="activity-entry__time">
                {formatDate(activity.date)}
              </div>
            </div>
            <div className="activity-entry__values">
              <div
                className={`activity-entry__amount ${
                  activity.type === 'income'
                    ? 'activity-entry__amount--positive'
                    : 'activity-entry__amount--negative'
                }`}
              >
                {activity.type === 'income' ? '+' : '−'}
                {formatCurrency(activity.amount)}
              </div>
              <div className="activity-entry__balance">
                {formatCurrency(activity.balanceAfter)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
