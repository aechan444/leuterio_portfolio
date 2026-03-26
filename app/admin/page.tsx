"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import '../../admin.css';

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('tab-coaching');
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();
  
  // Data state
  const [data, setData] = useState({
    coaching: [],
    ecosystem: [],
    developers: [],
    credentials: [],
    awards: []
  });
  const [editingItem, setEditingItem] = useState<any>(null);
  const [notification, setNotification] = useState<{show: boolean, type: 'success' | 'error' | 'confirm', title: string, message: string, onConfirm?: () => void}>({
    show: false,
    type: 'success',
    title: '',
    message: '',
  });

  const showNotify = (type: 'success' | 'error' | 'confirm', title: string, message: string, onConfirm?: () => void) => {
    setNotification({ show: true, type, title, message, onConfirm });
  };

  const closeNotify = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  const fetchData = async () => {
    const [coaching, ecosystem, developers, credentials, awards] = await Promise.all([
        supabase.from('coaching').select('*').order('badge_text', { ascending: true }),
        supabase.from('companies').select('*').order('name', { ascending: true }),
        supabase.from('developers').select('*').order('sort_order', { ascending: true }),
        supabase.from('credentials').select('*').order('institution', { ascending: true }),
        supabase.from('awards').select('*').order('year', { ascending: false })
    ]);

    setData({
        coaching: coaching.data || [],
        ecosystem: ecosystem.data || [],
        developers: developers.data || [],
        credentials: credentials.data || [],
        awards: awards.data || []
    });
  };

  const startEdit = (item: any) => {
    setEditingItem(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingItem(null);
  };

  useEffect(() => {
    if (session) {
        fetchData();
    }
  }, [session, activeTab]);

  useEffect(() => {
    console.log('Checking session...');
    const checkSession = async () => {
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;
            
            if (!session) {
                console.log('No session found, redirecting to login...');
                router.push('/login');
            } else {
                console.log('Session active:', session.user.email);
                setSession(session);
            }
        } catch (err) {
            console.error('Session check error:', err);
            router.push('/login');
        } finally {
            setAuthChecked(true);
        }
    };

    checkSession();

    // Fallback timeout: if still loading after 3 seconds, show fallback
    const timer = setTimeout(() => {
        if (!authChecked) {
            console.log('Auth check taking too long, showing fallback UI');
            setAuthChecked(true);
        }
    }, 3000);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      if (event === 'SIGNED_IN' && session) {
        setSession(session);
      }
      if (event === 'SIGNED_OUT') {
        router.push('/login');
      }
    });

    return () => {
        subscription.unsubscribe();
        clearTimeout(timer);
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('portfolio_images').upload(filePath, file);
    if (uploadError) {
        console.error('Storage Upload Error:', uploadError);
        throw new Error(`Storage Error: ${uploadError.message}`);
    }

    const { data } = supabase.storage.from('portfolio_images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleDelete = async (table: string, id: string) => {
    showNotify('confirm', 'Are you sure?', 'This action cannot be undone. This item will be permanently removed.', async () => {
        setLoading(true);
        try {
            console.log(`[DEBUG] Attempting to delete from ${table} where id=${id}`);
            const { error, count } = await supabase.from(table).delete({ count: 'exact' }).eq('id', id);
            
            if (error) {
                console.error(`[DEBUG] Supabase Delete Error:`, error);
                throw error;
            }
            
            console.log(`[DEBUG] Delete operation successful. Count of deleted rows:`, count);
            
            if (count === 0) {
                showNotify('error', 'Not Found', 'The item could not be found or you do not have permission to delete it.');
            } else {
                showNotify('success', 'Deleted', 'Item has been removed successfully.');
                await fetchData();
            }
        } catch (err: any) {
            console.error('[DEBUG] Delete catch block:', err);
            showNotify('error', 'Delete Failed', err.message || 'Unknown error occurred');
        }
        setLoading(false);
    });
  };

  const handleCoaching = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
        let publicUrl = editingItem?.image_url || '';
        const file = e.target['c-image'].files[0];
        if (file) {
            publicUrl = await uploadImage(file);
        }
        
        const payload = {
            image_url: publicUrl,
            badge_text: e.target['c-badge'].value,
            title: e.target['c-title'].value,
            description: e.target['c-desc'].value
        };

        if (editingItem) {
            const { error } = await supabase.from('coaching').update(payload).eq('id', editingItem.id);
            if (error) throw error;
            showNotify('success', 'Updated', 'Coaching card updated successfully.');
        } else {
            const { error } = await supabase.from('coaching').insert([{
                id: crypto.randomUUID(),
                ...payload
            }]);
            if (error) throw error;
            showNotify('success', 'Published', 'New coaching card has been added.');
        }
        
        e.target.reset();
        setEditingItem(null);
        await fetchData();
    } catch(err: any) { 
        showNotify('error', 'Error', err.message); 
    }
    setLoading(false);
  };

  const handleEcosystem = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
        let publicUrl = editingItem?.logo_url || '';
        const file = e.target['e-image'].files[0];
        if (file) publicUrl = await uploadImage(file);
        
        const payload = {
            logo_url: publicUrl,
            name: e.target['e-name'].value,
            website_url: e.target['e-url'].value,
            description: e.target['e-desc'].value
        };

        if (editingItem) {
            const { error } = await supabase.from('companies').update(payload).eq('id', editingItem.id);
            if (error) throw error;
            showNotify('success', 'Updated', 'Company details updated.');
        } else {
            const { error } = await supabase.from('companies').insert([{ id: crypto.randomUUID(), ...payload }]);
            if (error) throw error;
            showNotify('success', 'Published', 'New company added to ecosystem.');
        }
        e.target.reset();
        setEditingItem(null);
        await fetchData();
    } catch(err: any) { showNotify('error', 'Error', err.message); }
    setLoading(false);
  };

  const handleDevelopers = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
        let publicUrl = editingItem?.logo_url || '';
        const file = e.target['d-image'].files[0];
        if (file) publicUrl = await uploadImage(file);

        const payload = {
            logo_url: publicUrl,
            name: e.target['d-name'].value,
            website_url: e.target['d-url'].value,
            sort_order: parseInt(e.target['d-sort'].value)
        };

        if (editingItem) {
            const { error } = await supabase.from('developers').update(payload).eq('id', editingItem.id);
            if (error) throw error;
            showNotify('success', 'Updated', 'Partner details updated.');
        } else {
            const { error } = await supabase.from('developers').insert([{ id: crypto.randomUUID(), ...payload }]);
            if (error) throw error;
            showNotify('success', 'Published', 'New partner company added.');
        }
        e.target.reset();
        setEditingItem(null);
        await fetchData();
    } catch(err: any) { showNotify('error', 'Error', err.message); }
    setLoading(false);
  };

  const handleCredentials = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
        const payload = {
            institution: e.target['cred-institution'].value,
            title: e.target['cred-title'].value,
            organization: e.target['cred-org'].value,
            category: e.target['cred-category'].value
        };

        if (editingItem) {
            const { error } = await supabase.from('credentials').update(payload).eq('id', editingItem.id);
            if (error) throw error;
            showNotify('success', 'Updated', 'Credential updated.');
        } else {
            const { error } = await supabase.from('credentials').insert([{ id: crypto.randomUUID(), ...payload }]);
            if (error) throw error;
            showNotify('success', 'Published', 'New educational credential added.');
        }
        e.target.reset();
        setEditingItem(null);
        await fetchData();
    } catch(err: any) { showNotify('error', 'Error', err.message); }
    setLoading(false);
  };

  const handleAwards = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
        const payload = {
            title: e.target['award-title'].value,
            organization: e.target['award-org'].value,
            year: e.target['award-year'].value,
            icon: e.target['award-icon'].value
        };

        if (editingItem) {
            const { error } = await supabase.from('awards').update(payload).eq('id', editingItem.id);
            if (error) throw error;
            showNotify('success', 'Updated', 'Award updated.');
        } else {
            const { error } = await supabase.from('awards').insert([{ id: crypto.randomUUID(), ...payload }]);
            if (error) throw error;
            showNotify('success', 'Published', 'New award recognition added.');
        }
        e.target.reset();
        setEditingItem(null);
        await fetchData();
    } catch(err: any) { showNotify('error', 'Error', err.message); }
    setLoading(false);
  };

  if (!session) {
    return (
        <div style={{ background: 'var(--bg)', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <div className="overline">Security Check</div>
            <div style={{ fontSize: '18px' }}>{authChecked ? 'Access Denied or Session Expired' : 'Connecting to Server...'}</div>
            {!authChecked && <div className="loading-spinner" style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>}
            {authChecked && (
                <button onClick={() => router.push('/login')} className="big-btn" style={{ padding: '12px 24px', cursor: 'pointer' }}>
                    Go to Login Page
                </button>
            )}
            <style jsx>{`
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
  }

  return (
    <div className="admin-container">
        <div className="dash-header">
            <div>
                <span className="overline">Control Panel</span>
                <h2 style={{margin:0}}>Dashboard</h2>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'24px'}}>
                <span style={{color:'var(--gray)', fontSize:'14px'}}>{session.user.email}</span>
                <button onClick={handleLogout} className="text-link" style={{background:'transparent', borderTop:'none', borderLeft:'none', borderRight:'none', cursor:'pointer'}}>Disconnect →</button>
            </div>
        </div>
        
        <div className="tabs">
            <button className={`tab-btn ${activeTab === 'tab-coaching' ? 'active' : ''}`} onClick={() => { setActiveTab('tab-coaching'); setEditingItem(null); }}>
                <span className="tab-icon">🎯</span>
                Coaching Grid
            </button>
            <button className={`tab-btn ${activeTab === 'tab-ecosystem' ? 'active' : ''}`} onClick={() => { setActiveTab('tab-ecosystem'); setEditingItem(null); }}>
                <span className="tab-icon">🏢</span>
                My Companies
            </button>
            <button className={`tab-btn ${activeTab === 'tab-developers' ? 'active' : ''}`} onClick={() => { setActiveTab('tab-developers'); setEditingItem(null); }}>
                <span className="tab-icon">🤝</span>
                Partner companies
            </button>

            <button className={`tab-btn ${activeTab === 'tab-credentials' ? 'active' : ''}`} onClick={() => { setActiveTab('tab-credentials'); setEditingItem(null); }}>
                <span className="tab-icon">🎓</span>
                Education
            </button>
            <button className={`tab-btn ${activeTab === 'tab-awards' ? 'active' : ''}`} onClick={() => { setActiveTab('tab-awards'); setEditingItem(null); }}>
                <span className="tab-icon">🏆</span>
                Awards
            </button>
        </div>


        {activeTab === 'tab-coaching' && (
        <div className="tab-content" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start'}}>
            <div className="form-column">
                <h3>{editingItem ? 'Edit' : 'Add'} Coaching Card</h3>
                <p style={{color:'var(--gray)', fontSize:'13px', marginBottom:'24px'}}>{editingItem ? 'Update the selected card.' : 'Automatically uploads image and pushes layout to frontend grid.'}</p>
                <form onSubmit={handleCoaching} className="admin-form connect-form" style={{maxWidth:'100%'}}>
                    <div className="form-row">
                        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                            <label style={{fontSize:'12px', color:'var(--gold)'}}>IMAGE</label>
                            <input type="file" id="c-image" accept="image/*" required={!editingItem} style={{padding:'8px'}} />
                        </div>
                        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                            <label style={{fontSize:'12px', color:'var(--gold)'}}>BADGE</label>
                            <input type="text" id="c-badge" placeholder="e.g. Pillar 01" defaultValue={editingItem?.badge_text || ''} required />
                        </div>
                    </div>
                    <div className="form-row" style={{gridTemplateColumns:'1fr'}}>
                        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                            <label style={{fontSize:'12px', color:'var(--gold)'}}>TITLE</label>
                            <input type="text" id="c-title" placeholder="Title" defaultValue={editingItem?.title || ''} required />
                        </div>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', gap:'8px', marginBottom:'20px'}}>
                        <label style={{fontSize:'12px', color:'var(--gold)'}}>DESCRIPTION</label>
                        <textarea id="c-desc" placeholder="Card Description" defaultValue={editingItem?.description || ''} required style={{height:'100px'}}></textarea>
                    </div>
                    <div style={{display:'flex', gap:'12px'}}>
                        <button type="submit" className="big-btn" disabled={loading} style={{border:'none', cursor:'pointer', opacity: loading ? 0.7 : 1, flex: 1}}>
                            {loading ? 'Processing...' : (editingItem ? 'Update Card' : 'Publish Card')}
                        </button>
                        {editingItem && <button type="button" onClick={cancelEdit} className="big-btn" style={{background:'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)', flex: 0.3}}>Cancel</button>}
                    </div>
                </form>
            </div>

            <div className="manage-column">
                <div className="manage-header">
                    <h4>Manage Coaching Cards</h4>
                    <p style={{color:'var(--gray)', fontSize:'12px', marginTop:'-10px', marginBottom:'20px'}}>Sorted by Pillar badge</p>
                </div>
                <div className="coaching-mini-grid">
                    {data.coaching.map((item: any) => (
                        <div key={item.id} className="mini-card" style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: editingItem?.id === item.id ? '1px solid var(--gold)' : '1px solid var(--border)',
                            borderRadius: '12px',
                            padding: '12px',
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center',
                            marginBottom: '12px'
                        }}>
                            <img src={item.image_url} alt="" style={{width:'50px', height:'50px', borderRadius:'8px', objectFit:'cover'}} />
                            <div style={{flex: 1}}>
                                <div style={{fontSize:'10px', color:'var(--gold)', letterSpacing:'1px'}}>{item.badge_text}</div>
                                <div style={{fontSize:'14px', fontWeight:600}}>{item.title}</div>
                            </div>
                            <div className="actions-wrapper" style={{flexDirection:'column', gap:'4px'}}>
                                <button className="action-btn edit" onClick={() => startEdit(item)} style={{padding:'4px 10px', fontSize:'11px'}}>Edit</button>
                                <button className="action-btn delete" onClick={() => handleDelete('coaching', item.id)} style={{padding:'4px 10px', fontSize:'11px'}}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        )}

        {activeTab === 'tab-ecosystem' && (
        <div className="tab-content" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start'}}>
            <div className="form-column">
                <h3>{editingItem ? 'Edit' : 'Add'} My Company</h3>
                <p style={{color:'var(--gray)', fontSize:'13px', marginBottom:'24px'}}>{editingItem ? 'Update the selected company.' : 'Appears in the horizontal snapping scroll section.'}</p>
                <form onSubmit={handleEcosystem} className="admin-form connect-form" style={{maxWidth:'100%'}}>
                    <div className="form-row">
                        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                            <label style={{fontSize:'12px', color:'var(--gold)'}}>LOGO</label>
                            <input type="file" id="e-image" accept="image/*" required={!editingItem} style={{padding:'8px'}} />
                        </div>
                        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                            <label style={{fontSize:'12px', color:'var(--gold)'}}>NAME</label>
                            <input type="text" id="e-name" placeholder="Company Name" defaultValue={editingItem?.name || ''} required />
                        </div>
                    </div>
                    <div className="form-row" style={{gridTemplateColumns:'1fr'}}>
                        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                            <label style={{fontSize:'12px', color:'var(--gold)'}}>WEBSITE URL</label>
                            <input type="url" id="e-url" placeholder="https://..." defaultValue={editingItem?.website_url || ''} required />
                        </div>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', gap:'8px', marginBottom:'20px'}}>
                        <label style={{fontSize:'12px', color:'var(--gold)'}}>DESCRIPTION</label>
                        <textarea id="e-desc" placeholder="Company Description" defaultValue={editingItem?.description || ''} required style={{height:'100px'}}></textarea>
                    </div>
                    <div style={{display:'flex', gap:'12px'}}>
                        <button type="submit" className="big-btn" disabled={loading} style={{border:'none', cursor:'pointer', opacity: loading ? 0.7 : 1, flex: 1}}>
                            {loading ? 'Processing...' : (editingItem ? 'Update Company' : 'Publish Company')}
                        </button>
                        {editingItem && <button type="button" onClick={cancelEdit} className="big-btn" style={{background:'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)', flex: 0.3}}>Cancel</button>}
                    </div>
                </form>
            </div>

            <div className="manage-column">
                <div className="manage-header">
                    <h4>Manage Companies</h4>
                    <p style={{color:'var(--gray)', fontSize:'12px', marginTop:'-10px', marginBottom:'20px'}}>Sorted by Name</p>
                </div>
                <div className="mini-grid">
                    {data.ecosystem.map((item: any) => (
                        <div key={item.id} className="mini-card" style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: editingItem?.id === item.id ? '1px solid var(--gold)' : '1px solid var(--border)',
                            borderRadius: '12px',
                            padding: '12px',
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center',
                            marginBottom: '12px'
                        }}>
                            <img src={item.logo_url} alt="" style={{width:'40px', height:'40px', borderRadius:'6px', objectFit:'contain', background:'white', padding:'4px'}} />
                            <div style={{flex: 1}}>
                                <div style={{fontSize:'14px', fontWeight:600}}>{item.name}</div>
                                <div style={{fontSize:'11px', color:'var(--gray)', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap', maxWidth:'150px'}}>{item.website_url}</div>
                            </div>
                            <div className="actions-wrapper" style={{flexDirection:'column', gap:'4px'}}>
                                <button className="action-btn edit" onClick={() => startEdit(item)} style={{padding:'4px 10px', fontSize:'11px'}}>Edit</button>
                                <button className="action-btn delete" onClick={() => handleDelete('companies', item.id)} style={{padding:'4px 10px', fontSize:'11px'}}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        )}

        {activeTab === 'tab-developers' && (
        <div className="tab-content" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start'}}>
            <div className="form-column">
                <h3>{editingItem ? 'Edit' : 'Add'} Partner Company</h3>
                <p style={{color:'var(--gray)', fontSize:'13px', marginBottom:'24px'}}>{editingItem ? 'Update the selected partner.' : 'Appears in the grid and marquee tracking strip.'}</p>
                <form onSubmit={handleDevelopers} className="admin-form connect-form" style={{maxWidth:'100%'}}>
                    <div className="form-row">
                        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                            <label style={{fontSize:'12px', color:'var(--gold)'}}>LOGO</label>
                            <input type="file" id="d-image" accept="image/*" required={!editingItem} style={{padding:'8px'}} />
                        </div>
                        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                            <label style={{fontSize:'12px', color:'var(--gold)'}}>NAME</label>
                            <input type="text" id="d-name" placeholder="Developer Name" defaultValue={editingItem?.name || ''} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                            <label style={{fontSize:'12px', color:'var(--gold)'}}>WEBSITE URL</label>
                            <input type="url" id="d-url" placeholder="https://..." defaultValue={editingItem?.website_url || ''} required />
                        </div>
                        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                            <label style={{fontSize:'12px', color:'var(--gold)'}}>SORT ORDER</label>
                            <input type="number" id="d-sort" placeholder="0" defaultValue={editingItem?.sort_order || 0} required />
                        </div>
                    </div>
                    <div style={{display:'flex', gap:'12px', marginTop:'20px'}}>
                        <button type="submit" className="big-btn" disabled={loading} style={{border:'none', cursor:'pointer', opacity: loading ? 0.7 : 1, flex: 1}}>
                            {loading ? 'Processing...' : (editingItem ? 'Update Partner' : 'Publish Partner')}
                        </button>
                        {editingItem && <button type="button" onClick={cancelEdit} className="big-btn" style={{background:'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)', flex: 0.3}}>Cancel</button>}
                    </div>
                </form>
            </div>

            <div className="manage-column">
                <div className="manage-header">
                    <h4>Manage Partners</h4>
                    <p style={{color:'var(--gray)', fontSize:'12px', marginTop:'-10px', marginBottom:'20px'}}>Sorted by Sort Order</p>
                </div>
                <div className="mini-grid">
                    {data.developers.map((item: any) => (
                        <div key={item.id} className="mini-card" style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: editingItem?.id === item.id ? '1px solid var(--gold)' : '1px solid var(--border)',
                            borderRadius: '12px',
                            padding: '12px',
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center',
                            marginBottom: '12px'
                        }}>
                            <img src={item.logo_url} alt="" style={{width:'40px', height:'40px', borderRadius:'6px', objectFit:'contain', background:'white', padding:'4px'}} />
                            <div style={{flex: 1}}>
                                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                    <span style={{fontSize:'10px', background:'var(--gold)', color:'var(--bg)', padding:'0 4px', borderRadius:'3px', fontWeight:800}}>{item.sort_order}</span>
                                    <div style={{fontSize:'14px', fontWeight:600}}>{item.name}</div>
                                </div>
                            </div>
                            <div className="actions-wrapper" style={{flexDirection:'column', gap:'4px'}}>
                                <button className="action-btn edit" onClick={() => startEdit(item)} style={{padding:'4px 10px', fontSize:'11px'}}>Edit</button>
                                <button className="action-btn delete" onClick={() => handleDelete('developers', item.id)} style={{padding:'4px 10px', fontSize:'11px'}}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        )}

        {activeTab === 'tab-credentials' && (
        <div className="tab-content" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start'}}>
            <div className="form-column">
                <h3>{editingItem ? 'Edit' : 'Add'} Education Credential</h3>
                <p style={{color:'var(--gray)', fontSize:'13px', marginBottom:'24px'}}>{editingItem ? 'Update the selected credential.' : 'Appears in the Executive Credentials section.'}</p>
                <form onSubmit={handleCredentials} className="admin-form connect-form" style={{maxWidth:'100%'}}>
                    <div className="form-row">
                        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                            <label style={{fontSize:'12px', color:'var(--gold)'}}>INSTITUTION</label>
                            <input type="text" id="cred-institution" placeholder="e.g. Harvard" defaultValue={editingItem?.institution || ''} required />
                        </div>
                        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                            <label style={{fontSize:'12px', color:'var(--gold)'}}>CATEGORY</label>
                            <select id="cred-category" defaultValue={editingItem?.category || ''} required style={{padding:'12px', background:'var(--card)', border:'1px solid var(--border)', color:'white', borderRadius:'8px'}}>
                                <option value="">Select Category</option>
                                <option value="harvard">Harvard</option>
                                <option value="other">Other Institutions</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row" style={{gridTemplateColumns:'1fr'}}>
                        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                            <label style={{fontSize:'12px', color:'var(--gold)'}}>TITLE</label>
                            <input type="text" id="cred-title" placeholder="Credential Title" defaultValue={editingItem?.title || ''} required />
                        </div>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', gap:'8px', marginBottom:'20px'}}>
                        <label style={{fontSize:'12px', color:'var(--gold)'}}>ORGANIZATION & YEAR</label>
                        <input type="text" id="cred-org" placeholder="e.g. HBS Online — 2025" defaultValue={editingItem?.organization || ''} required />
                    </div>
                    <div style={{display:'flex', gap:'12px'}}>
                        <button type="submit" className="big-btn" disabled={loading} style={{border:'none', cursor:'pointer', opacity: loading ? 0.7 : 1, flex: 1}}>
                            {loading ? 'Processing...' : (editingItem ? 'Update Credential' : 'Publish Credential')}
                        </button>
                        {editingItem && <button type="button" onClick={cancelEdit} className="big-btn" style={{background:'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)', flex: 0.3}}>Cancel</button>}
                    </div>
                </form>
            </div>

            <div className="manage-column">
                <div className="manage-header">
                    <h4>Manage Education</h4>
                    <p style={{color:'var(--gray)', fontSize:'12px', marginTop:'-10px', marginBottom:'20px'}}>Sorted by Institution</p>
                </div>
                <div className="mini-grid">
                    {data.credentials.map((item: any) => (
                        <div key={item.id} className="mini-card" style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: editingItem?.id === item.id ? '1px solid var(--gold)' : '1px solid var(--border)',
                            borderRadius: '12px',
                            padding: '12px',
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center',
                            marginBottom: '12px'
                        }}>
                            <div style={{flex: 1}}>
                                <div style={{fontSize:'10px', color:'var(--gold)', letterSpacing:'1px'}}>{item.institution} — {item.category}</div>
                                <div style={{fontSize:'14px', fontWeight:600}}>{item.title}</div>
                                <div style={{fontSize:'11px', color:'var(--gray)'}}>{item.organization}</div>
                            </div>
                            <div className="actions-wrapper" style={{flexDirection:'column', gap:'4px'}}>
                                <button className="action-btn edit" onClick={() => startEdit(item)} style={{padding:'4px 10px', fontSize:'11px'}}>Edit</button>
                                <button className="action-btn delete" onClick={() => handleDelete('credentials', item.id)} style={{padding:'4px 10px', fontSize:'11px'}}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        )}

        {activeTab === 'tab-awards' && (
        <div className="tab-content" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start'}}>
            <div className="form-column">
                <h3>{editingItem ? 'Edit' : 'Add'} Award / Recognition</h3>
                <p style={{color:'var(--gray)', fontSize:'13px', marginBottom:'24px'}}>{editingItem ? 'Update the selected award.' : 'Appears in the Awards & Recognition wall.'}</p>
                <form onSubmit={handleAwards} className="admin-form connect-form" style={{maxWidth:'100%'}}>
                    <div className="form-row">
                        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                            <label style={{fontSize:'12px', color:'var(--gold)'}}>TITLE</label>
                            <input type="text" id="award-title" placeholder="Award Title" defaultValue={editingItem?.title || ''} required />
                        </div>
                        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                            <label style={{fontSize:'12px', color:'var(--gold)'}}>ICON</label>
                            <input type="text" id="award-icon" placeholder="🏆, 💎, 🎖️" defaultValue={editingItem?.icon || ''} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                            <label style={{fontSize:'12px', color:'var(--gold)'}}>ORGANIZATION</label>
                            <input type="text" id="award-org" placeholder="Awarding Organization" defaultValue={editingItem?.organization || ''} required />
                        </div>
                        <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                            <label style={{fontSize:'12px', color:'var(--gold)'}}>YEAR</label>
                            <input type="text" id="award-year" placeholder="2024" defaultValue={editingItem?.year || ''} required />
                        </div>
                    </div>
                    <div style={{display:'flex', gap:'12px', marginTop:'20px'}}>
                        <button type="submit" className="big-btn" disabled={loading} style={{border:'none', cursor:'pointer', opacity: loading ? 0.7 : 1, flex: 1}}>
                            {loading ? 'Processing...' : (editingItem ? 'Update Award' : 'Publish Award')}
                        </button>
                        {editingItem && <button type="button" onClick={cancelEdit} className="big-btn" style={{background:'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)', flex: 0.3}}>Cancel</button>}
                    </div>
                </form>
            </div>

            <div className="manage-column">
                <div className="manage-header">
                    <h4>Manage Awards</h4>
                    <p style={{color:'var(--gray)', fontSize:'12px', marginTop:'-10px', marginBottom:'20px'}}>Sorted by Year (Newest First)</p>
                </div>
                <div className="mini-grid">
                    {data.awards.map((item: any) => (
                        <div key={item.id} className="mini-card" style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: editingItem?.id === item.id ? '1px solid var(--gold)' : '1px solid var(--border)',
                            borderRadius: '12px',
                            padding: '12px',
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center',
                            marginBottom: '12px'
                        }}>
                            <div style={{fontSize:'24px', width:'40px', textAlign:'center'}}>{item.icon}</div>
                            <div style={{flex: 1}}>
                                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                    <span style={{fontSize:'10px', color:'var(--gold)', fontWeight:800}}>{item.year}</span>
                                    <div style={{fontSize:'14px', fontWeight:600}}>{item.title}</div>
                                </div>
                                <div style={{fontSize:'11px', color:'var(--gray)'}}>{item.organization}</div>
                            </div>
                            <div className="actions-wrapper" style={{flexDirection:'column', gap:'4px'}}>
                                <button className="action-btn edit" onClick={() => startEdit(item)} style={{padding:'4px 10px', fontSize:'11px'}}>Edit</button>
                                <button className="action-btn delete" onClick={() => handleDelete('awards', item.id)} style={{padding:'4px 10px', fontSize:'11px'}}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        )}

        {notification.show && (
            <div className="modal-overlay" onClick={closeNotify}>
                <div className="modal-card" onClick={e => e.stopPropagation()}>
                    <div className={`modal-icon-wrapper ${notification.type}`}>
                        {notification.type === 'success' ? '✓' : notification.type === 'confirm' ? '!' : '✕'}
                    </div>
                    <h3 className="modal-title">{notification.title}</h3>
                    <p className="modal-message">{notification.message}</p>
                    
                    <div className="modal-actions">
                        {notification.type === 'confirm' ? (
                            <>
                                <button onClick={closeNotify} className="modal-btn modal-btn-secondary">Cancel</button>
                                <button onClick={() => { notification.onConfirm?.(); closeNotify(); }} className="modal-btn modal-btn-danger">Delete</button>
                            </>
                        ) : (
                            <button onClick={closeNotify} className="modal-btn modal-btn-primary" style={{width: '100%'}}>Dismiss</button>
                        )}
                    </div>
                </div>
            </div>
        )}

    </div>
  );
}
