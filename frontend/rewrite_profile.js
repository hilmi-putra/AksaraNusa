const fs = require('fs');

const path = 'C:\\laragon\\www\\aksaranusa\\frontend\\features\\store\\dashboard\\ProfileSettings.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Imports
content = content.replace(
  /import \{ getAddresses, createAddress, deleteAddress, updateAddress \} from "@\/lib\/api\/user";/,
  `import { getAddresses, createAddress, deleteAddress, updateAddress, updateProfile, updatePassword } from "@/lib/api/user";\nimport { AddAddressModal } from "@/components/organisms/AddAddressModal";\nimport { SavedAddress } from "@/components/organisms/SavedAddressesModal";`
);

// 2. Add state for profile and password forms
const stateInjection = `
  const [profileForm, setProfileForm] = useState({ first_name: '', last_name: '', phone: '' });
  const [passwordForm, setPasswordForm] = useState({ current_password: '', new_password: '', new_password_confirmation: '' });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const nameParts = user.name ? user.name.split(' ') : [''];
      setProfileForm({
        first_name: user.first_name || nameParts[0] || '',
        last_name: user.last_name || (nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''),
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleProfileSubmit = async () => {
    setIsSavingProfile(true);
    try {
      const res = await updateProfile(profileForm);
      setUser(res.user);
      Cookies.set(USER_COOKIE, JSON.stringify(res.user));
      toast.success("Profil berhasil diperbarui!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal memperbarui profil");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async () => {
    if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
      toast.error("Konfirmasi sandi baru tidak cocok");
      return;
    }
    setIsSavingPassword(true);
    try {
      await updatePassword(passwordForm);
      setPasswordForm({ current_password: '', new_password: '', new_password_confirmation: '' });
      toast.success("Kata sandi berhasil diperbarui!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal memperbarui kata sandi");
    } finally {
      setIsSavingPassword(false);
    }
  };
`;

content = content.replace(
  /const \[user, setUser\] = useState<any>\(null\);/,
  `const [user, setUser] = useState<any>(null);\n${stateInjection}`
);

// 3. Replace the activeTab === 'personal' section
const personalRegex = /\{\/\* Content \*\/\}\s*<div className="p-6 md:p-8">\s*\{activeTab === 'personal' && \([\s\S]*?\}\)/;
const newPersonal = `{/* Content */}
      <div className="p-6 md:p-8">
        
        {activeTab === 'personal' && (
          <div className="max-w-2xl flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Nama Depan</label>
                <input type="text" value={profileForm.first_name} onChange={e => setProfileForm({...profileForm, first_name: e.target.value})} className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Nama Belakang</label>
                <input type="text" value={profileForm.last_name} onChange={e => setProfileForm({...profileForm, last_name: e.target.value})} className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Email</label>
                <input type="email" value={user?.email || ""} disabled className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm text-gray-400 focus:outline-none" />
                <p className="text-[10px] text-gray-400 mt-1">Email tidak dapat diubah karena terhubung ke akun Anda.</p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Nomor HP</label>
                <input type="tel" value={profileForm.phone} onChange={e => setProfileForm({...profileForm, phone: e.target.value})} placeholder="e.g. 081234567890" className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleProfileSubmit} disabled={isSavingProfile} className="bg-gradient-primary hover:bg-[#b06f00] text-white h-12 px-8 rounded-none font-bold tracking-widest uppercase text-xs transition-colors">
                {isSavingProfile ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </div>
        )}`;
content = content.replace(personalRegex, newPersonal);

// 4. Replace the activeTab === 'password' section
const passwordRegex = /\{activeTab === 'password' && \([\s\S]*?\}\)/;
const newPassword = `{activeTab === 'password' && (
          <div className="max-w-md flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Sandi Saat Ini</label>
                <input type="password" value={passwordForm.current_password} onChange={e => setPasswordForm({...passwordForm, current_password: e.target.value})} placeholder="Masukkan kata sandi saat ini" className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Sandi Baru</label>
                <input type="password" value={passwordForm.new_password} onChange={e => setPasswordForm({...passwordForm, new_password: e.target.value})} placeholder="Masukkan kata sandi baru" className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Konfirmasi Sandi Baru</label>
                <input type="password" value={passwordForm.new_password_confirmation} onChange={e => setPasswordForm({...passwordForm, new_password_confirmation: e.target.value})} placeholder="Ulangi kata sandi baru" className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handlePasswordSubmit} disabled={isSavingPassword} className="bg-[#171512] hover:bg-black text-white h-12 px-8 rounded-none font-bold tracking-widest uppercase text-xs transition-colors">
                {isSavingPassword ? "Memperbarui..." : "Perbarui Sandi"}
              </Button>
            </div>
          </div>
        )}`;
content = content.replace(passwordRegex, newPassword);

// 5. Replace Add Address Form with the AddAddressModal component
const addressSectionRegex = /\{activeTab === 'addresses' && \([\s\S]*?\{showAddressForm \? \([\s\S]*?\) : \(/;
const newAddressSection = `{activeTab === 'addresses' && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg text-[#171512]">Daftar Alamat Tersimpan</h3>
              <Button 
                onClick={() => setIsAddAddressModalOpen(true)}
                className="bg-transparent text-[#171512] border border-[#171512] hover:bg-black hover:text-white h-10 px-4 rounded-none font-bold tracking-widest uppercase text-xs transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Alamat
              </Button>
            </div>
            (`;
content = content.replace(addressSectionRegex, newAddressSection);

const endAddressSectionRegex = /\) \/\* End of !showAddressForm \*\/\}\s*<\/div>\s*\)\}/;
content = content.replace(endAddressSectionRegex, `</div>\n        )}`);

// Need to also inject the modal at the bottom
const modalInjection = `
      <AddAddressModal 
        isOpen={isAddAddressModalOpen}
        onClose={() => setIsAddAddressModalOpen(false)}
        onSave={async (payload: any) => {
          try {
            await createAddress(payload);
            setIsAddAddressModalOpen(false);
            fetchAddresses();
            toast.success("Alamat berhasil ditambahkan!");
          } catch (err: any) {
            toast.error(err.response?.data?.message || "Gagal menambahkan alamat");
          }
        }}
      />
    </div>
  );
}
`;
content = content.replace(/<\/div>\s*<ConfirmDialog[\s\S]*?<\/div>\s*\);\s*\}/, (match) => {
  return match.replace(/<\/div>\s*\);\s*\}/, modalInjection);
});

fs.writeFileSync(path, content, 'utf8');
console.log('Done replacing ProfileSettings.tsx');
