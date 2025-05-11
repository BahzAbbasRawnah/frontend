
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { getDictionary } from '@/lib/getDictionary';
import type { Locale } from '@/i18n-config';
import { MessageSquare, Send, Paperclip, Mic, ImagePlus, FileText, SmilePlus, Users, Settings, Search } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: `${dictionary.chatPageTitle} - ${dictionary.siteName}`,
    description: dictionary.chatPageSubtitle,
  };
}

// Dummy data for chat
const dummyContacts = [
  { id: '1', name: 'Alice Wonderland', avatarUrl: 'https://picsum.photos/seed/alice/40/40', lastMessage: 'Hey there!', time: '10:30 AM', unread: 2, imageHint: "woman portrait" },
  { id: '2', name: 'Bob The Builder', avatarUrl: 'https://picsum.photos/seed/bob/40/40', lastMessage: 'Can we build it?', time: 'Yesterday', unread: 0, imageHint: "man portrait" },
  { id: '3', name: 'Charlie Chaplin', avatarUrl: 'https/picsum.photos/seed/charlie/40/40', lastMessage: 'A day without laughter is a day wasted.', time: 'Mon', unread: 0, imageHint: "man smiling" },
  { id: '4', name: 'Project Alpha Team', avatarUrl: 'https://picsum.photos/seed/teamalpha/40/40', lastMessage: 'Meeting at 2 PM.', time: '9:15 AM', unread: 1, imageHint: "group people" },
];

const dummyMessages = [
    { id: 'm1', senderId: '1', content: 'Hey there! How are you doing?', timestamp: '10:30 AM', type: 'text', isOwn: false },
    { id: 'm2', senderId: 'currentUser', content: 'Hi Alice! I am good, thanks for asking. How about you?', timestamp: '10:31 AM', type: 'text', isOwn: true },
    { id: 'm3', senderId: '1', content: 'Doing great! Just working on the new designs.', timestamp: '10:32 AM', type: 'text', isOwn: false },
    { id: 'm4', senderId: '1', content: {src:'https://picsum.photos/seed/design/300/200', alt: 'Design preview', hint: "ui design"}, timestamp: '10:33 AM', type: 'image', isOwn: false },
    { id: 'm5', senderId: 'currentUser', content: 'Looks awesome! 🔥', timestamp: '10:34 AM', type: 'text', isOwn: true },
];


export default async function ChatPage({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);
  const activeChatContact = dummyContacts[0]; // Simulate an active chat

  return (
    <ProtectedRoute lang={params.lang}>
      <div className="flex h-[calc(100vh-4rem)] antialiased text-foreground bg-background">
        {/* Sidebar */}
        <aside className="flex flex-col w-full md:w-80 lg:w-96 border-e border-border bg-card overflow-y-hidden">
          <CardHeader className="p-4 border-b border-border">
             <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-primary">{dictionary.chatPageTitle}</CardTitle>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary"><Users className="h-5 w-5"/></Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary"><Settings className="h-5 w-5"/></Button>
                </div>
             </div>
            <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:right-3 rtl:left-auto" />
                <Input placeholder={dictionary.chatSearchPlaceholder} className="ps-10 rtl:pr-10 bg-secondary/50 border-0 focus-visible:ring-primary" />
            </div>
          </CardHeader>
          <ScrollArea className="flex-grow">
            <div className="py-2">
              {dummyContacts.map(contact => (
                <Button
                  key={contact.id}
                  variant={contact.id === activeChatContact.id ? "secondary" : "ghost"}
                  className="w-full justify-start h-auto p-3 rounded-none"
                >
                  <Avatar className="h-10 w-10 me-3 rtl:ms-3">
                    <AvatarImage src={contact.avatarUrl} alt={contact.name} data-ai-hint={contact.imageHint} />
                    <AvatarFallback>{contact.name.substring(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow text-start overflow-hidden">
                    <p className="font-medium truncate">{contact.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                  </div>
                  <div className="ms-auto rtl:mr-auto text-xs text-muted-foreground text-end space-y-1">
                    <p>{contact.time}</p>
                    {contact.unread > 0 && (
                      <span className="inline-block bg-accent text-accent-foreground rounded-full px-1.5 py-0.5 text-xs font-semibold">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col bg-secondary/30 overflow-y-hidden">
          {activeChatContact ? (
            <>
              {/* Chat Header */}
              <header className="bg-card p-4 border-b border-border flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={activeChatContact.avatarUrl} alt={activeChatContact.name} data-ai-hint={activeChatContact.imageHint} />
                    <AvatarFallback>{activeChatContact.name.substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="font-semibold text-primary">{activeChatContact.name}</h2>
                    <p className="text-xs text-muted-foreground">{dictionary.chatOnlineStatus}</p>
                </div>
              </header>

              {/* Messages Area */}
              <ScrollArea className="flex-grow p-4 space-y-4">
                {dummyMessages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md p-3 rounded-xl ${msg.isOwn ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground shadow-sm'}`}>
                      {msg.type === 'text' && <p className="text-sm">{msg.content as string}</p>}
                      {msg.type === 'image' && typeof msg.content === 'object' && (
                        <Image src={(msg.content as {src:string}).src} alt={(msg.content as {alt:string}).alt} data-ai-hint={(msg.content as {hint:string}).hint} width={250} height={150} className="rounded-md"/>
                      )}
                      <p className={`text-xs mt-1 ${msg.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'} ${msg.isOwn ? 'text-end' : 'text-start'}`}>{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
                 <p className="text-center text-sm text-muted-foreground py-4">{dictionary.chatFeatureComingSoon}</p>
              </ScrollArea>

              {/* Message Input */}
              <footer className="bg-card p-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" disabled>
                    <SmilePlus className="h-5 w-5" />
                  </Button>
                  <Textarea
                    placeholder={dictionary.chatSendMessagePlaceholder}
                    className="flex-grow resize-none border-0 focus-visible:ring-0 shadow-none bg-transparent py-2 px-2"
                    rows={1}
                    disabled
                  />
                   <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" disabled>
                    <Paperclip className="h-5 w-5" />
                  </Button>
                   <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" disabled>
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" size="icon" disabled>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                 <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="text-xs" disabled><ImagePlus className="me-1 rtl:ms-1 h-3 w-3" /> {dictionary.chatSendImage}</Button>
                    <Button variant="outline" size="sm" className="text-xs" disabled><FileText className="me-1 rtl:ms-1 h-3 w-3" /> {dictionary.chatSendFile}</Button>
                 </div>
              </footer>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
              <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold text-primary mb-1">{dictionary.chatEmptyTitle}</h2>
              <p className="text-muted-foreground">{dictionary.chatEmptySubtitle}</p>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
