import { UserProfilePage } from '@/components/profile/UserProfilePage';

export default function ProfilePageRoute({ 
  params 
}: { 
  params: { username: string } 
}) {
  return <UserProfilePage username={params.username} />;
}

export async function generateMetadata({ params }: { params: { username: string } }) {
  return {
    title: `@${params.username} - Hive Social Profile`,
    description: `View ${params.username}'s profile on Hive Social`,
  };
}