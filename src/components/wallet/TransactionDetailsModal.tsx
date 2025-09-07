// src/components/wallet/TransactionDetailsModal.tsx
"use client";

import { ExternalLink } from 'lucide-react';
import { Transaction } from '@/hooks/useTransactionHistory';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';

interface TransactionDetailsModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionDetailsModal({ transaction, isOpen, onClose }: TransactionDetailsModalProps) {
  if (!transaction) return null;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getTransactionTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      transfer: 'Transfer',
      power_up: 'Power Up',
      power_down: 'Power Down',
      delegation: 'Delegation',
      reward: 'Reward',
      conversion: 'Conversion',
      conversion_filled: 'Conversion Filled',
      order_create: 'Order Create',
      order_cancel: 'Order Cancel',
      order_filled: 'Order Filled',
      custom: 'Custom Operation',
      other: 'Other Operation'
    };
    
    return typeLabels[type] || type;
  };

  const viewOnBlockchain = () => {
    if (transaction.hash) {
      const url = `https://hiveblocks.com/tx/${transaction.hash}`;
      window.open(url, '_blank');
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-md">
        <ModalHeader>
          <ModalTitle>Transaction Details</ModalTitle>
        </ModalHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Type</span>
            <Badge variant="secondary">{getTransactionTypeLabel(transaction.type)}</Badge>
          </div>
          
          <div>
            <span className="text-sm font-medium">Description</span>
            <p className="text-sm mt-1">{transaction.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium">Amount</span>
              <p className="text-sm mt-1">
                {transaction.amount && transaction.amount !== '0' ? transaction.amount : 'N/A'}
              </p>
            </div>
            
            <div>
              <span className="text-sm font-medium">Currency</span>
              <p className="text-sm mt-1">
                {transaction.currency && transaction.currency !== 'N/A' ? transaction.currency : 'N/A'}
              </p>
            </div>
          </div>
          
          {transaction.usdValue !== undefined && transaction.usdValue > 0 && (
            <div>
              <span className="text-sm font-medium">Estimated Value</span>
              <p className="text-sm mt-1">${transaction.usdValue.toFixed(2)} USD</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium">Status</span>
              <p className="text-sm mt-1 capitalize">{transaction.status}</p>
            </div>
            
            <div>
              <span className="text-sm font-medium">Date</span>
              <p className="text-sm mt-1">{formatTimestamp(transaction.timestamp)}</p>
            </div>
          </div>
          
          <div>
            <span className="text-sm font-medium">Transaction Hash</span>
            <p className="text-sm font-mono mt-1 break-all">{transaction.hash}</p>
          </div>
          
          {(transaction.from || transaction.to) && (
            <div className="grid grid-cols-2 gap-4">
              {transaction.from && (
                <div>
                  <span className="text-sm font-medium">From</span>
                  <p className="text-sm mt-1">@{transaction.from}</p>
                </div>
              )}
              
              {transaction.to && (
                <div>
                  <span className="text-sm font-medium">To</span>
                  <p className="text-sm mt-1">@{transaction.to}</p>
                </div>
              )}
            </div>
          )}
          
          {transaction.memo && (
            <div>
              <span className="text-sm font-medium">Memo</span>
              <p className="text-sm mt-1 break-all">{transaction.memo}</p>
            </div>
          )}
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={viewOnBlockchain} disabled={!transaction.hash}>
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Blockchain
            </Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}