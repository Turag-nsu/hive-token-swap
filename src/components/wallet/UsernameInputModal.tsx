'use client';

import React, { useState } from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal, ModalContent } from '@/components/ui/Modal';

interface UsernameInputModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (username: string) => void;
    isLoading?: boolean;
}

export function UsernameInputModal({
    isOpen,
    onClose,
    onSubmit,
    isLoading = false
}: UsernameInputModalProps) {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!username.trim()) {
            setError('Username is required');
            return;
        }

        // Basic username validation
        const cleanUsername = username.trim().toLowerCase();
        if (!/^[a-z0-9.-]+$/.test(cleanUsername)) {
            setError('Username can only contain lowercase letters, numbers, dots, and hyphens');
            return;
        }

        if (cleanUsername.length < 3 || cleanUsername.length > 16) {
            setError('Username must be between 3 and 16 characters');
            return;
        }

        setError('');
        onSubmit(cleanUsername);
    };

    const handleClose = () => {
        if (!isLoading) {
            setUsername('');
            setError('');
            onClose();
        }
    };

    return (
        <Modal open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <ModalContent>
                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <User className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-semibold">Enter Hive Username</h2>
                    </div>

                    <p className="text-muted-foreground mb-4">
                        Please enter your Hive username to connect with HiveKeychain:
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter your Hive username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setError('');
                                }}
                                disabled={isLoading}
                                className={error ? 'border-red-500' : ''}
                            />
                            {error && (
                                <p className="text-sm text-red-500 mt-1">{error}</p>
                            )}
                        </div>

                        <div className="flex space-x-3">
                            <Button
                                type="submit"
                                disabled={isLoading || !username.trim()}
                                className="flex-1"
                            >
                                {isLoading ? 'Connecting...' : 'Connect'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>

                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            <strong>Note:</strong> Make sure you have HiveKeychain extension installed
                            and your account configured in it. You'll be prompted to approve the connection.
                        </p>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}
